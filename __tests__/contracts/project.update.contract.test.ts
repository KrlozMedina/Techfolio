import { describe, it, expect } from "vitest";
// import { UpdateProjectV2Dto } from "@/lib/dtos/project.schema";
import { ProjectStatus } from "@/shared/enums/enums";
import { UpdateProjectV2Dto } from "@/app/schemas/dtos";

const validBase = {
  projectInfo: {
    es: { title: "Titulo", description: "Desc" },
    en: { title: "Title", description: "Desc" },
  },
  teamInfo: {
    roleId: "Dev",
    teamSize: 2,
  },
  tags: {
    platformId: "Web",
    technologyIds: ["Next.js"],
  },
  urls: {
    repository: "https://github.com/test",
    live: "https://example.com",
  },
  assets: {
    main: "https://img.com/a.jpg",
    blur: "https://img.com/b.jpg",
  },
  importanceScore: 5,
  status: ProjectStatus.FINISHED,
};

describe("UpdateProjectV2Dto – contrato PUT", () => {
  it("✅ permite update parcial válido", () => {
    const result = UpdateProjectV2Dto.safeParse({
      projectInfo: validBase.projectInfo,
    });

    expect(result.success).toBe(true);
  });

  it("❌ rechaza slug en PUT", () => {
    const result = UpdateProjectV2Dto.safeParse({
      ...validBase,
      slug: "nuevo-slug",
    });

    expect(result.success).toBe(false);
  });

  it("❌ rechaza campos desconocidos", () => {
    const result = UpdateProjectV2Dto.safeParse({
      ...validBase,
      foo: "bar",
    });

    expect(result.success).toBe(false);
  });

  it("❌ falla si technologyIds está vacío", () => {
    const result = UpdateProjectV2Dto.safeParse({
      tags: {
        platformId: "Web",
        technologyIds: [],
      },
    });

    expect(result.success).toBe(false);
  });
});
