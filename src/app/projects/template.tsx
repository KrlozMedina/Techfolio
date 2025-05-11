export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-wrapper">
              {/* <span className="background__image" /> */}
              <h1>Hola mundo</h1>
      
      {children}
    </div>
  );
}
