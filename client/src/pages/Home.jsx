import Client from "../components/Client"
import AddClientModal from "../components/AddClientModal";
import Projects from "../components/Projects";


export default function Home() {
  return (
    <>
      <AddClientModal />
      <Projects />
      <Client />
    </>
  )
}
