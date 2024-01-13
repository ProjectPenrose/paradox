// Define the Divider component.
// This component will be used to separate the other components.
export default function Divider(props = {}) {
  return {
    tag: "hr",
    options: {
      classList: "my-4"
    }
  }
}