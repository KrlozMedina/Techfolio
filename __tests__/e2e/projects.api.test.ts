import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { connectTestDB, clearTestDB, disconnectTestDB } from "../helpers/db";
import { getAuthCookie } from "../helpers/auth";
import { ProjectV2 } from "@/models/project/project.model";

const BASE_URL = "http://localhost:3000";

describe("E2E – PUT /api/v2/projects/:id", () => {
  let projectId: string;

  beforeAll(async () => {
    await connectTestDB();
    await clearTestDB();

    const project = await ProjectV2.create({
      projectInfo: {
        es: { title: "Test", description: "Desc" },
        en: { title: "Test", description: "Desc" },
      },
      teamInfo: {},
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
      status: "finished",
      slug: "test-project",
    });

    projectId = project._id.toString();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it("✅ actualiza proyecto correctamente", async () => {
    const res = await fetch(
      `${BASE_URL}/api/v2/projects/${projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: getAuthCookie("admin"),
        },
        body: JSON.stringify({
          importanceScore: 8,
        }),
      }
    );

    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.importanceScore).toBe(8);
  });

  it("❌ rechaza slug en PUT", async () => {
    const res = await fetch(
      `${BASE_URL}/api/v2/projects/${projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: getAuthCookie("admin"),
        },
        body: JSON.stringify({
          slug: "nuevo-slug",
        }),
      }
    );

    expect(res.status).toBe(400);
  });

  it("❌ 403 sin permiso", async () => {
    const res = await fetch(
      `${BASE_URL}/api/v2/projects/${projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: getAuthCookie("user"),
        },
        body: JSON.stringify({
          importanceScore: 2,
        }),
      }
    );

    expect(res.status).toBe(403);
  });
});
