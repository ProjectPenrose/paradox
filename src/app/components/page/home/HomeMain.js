export default function () {
  return {
    main: {
      className: "container-fluid",
      div: {
        className: "container d-flex flex-column justify-content-center",
        children: [
          {
            p: {
              className: "lead",
              html: "Hello World! <br> Not another framework!"
            },
          },
          {
            p: {
              html: "Just a reactive javascript library for beginners"
            },
          }
        ]
      }
    }
  }
}