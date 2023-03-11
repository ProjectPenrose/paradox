export default function () {
  return {
    footer: {
      className: "container-fluid border-top",
      div: {
        className: "container d-flex justify-content-end py-3",
        p: {
          className: "p-0 m-0",
          html: `Developed by 
            <a href="https://github.com/ProjectPenrose" target="_blank">
              Project Penrose
            </a>
          `,
        }
      }
    }
  }
}