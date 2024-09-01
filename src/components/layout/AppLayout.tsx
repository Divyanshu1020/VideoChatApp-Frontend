import Title from "../shared/Title";
import {HelmetProvider} from "react-helmet-async"

export default function AppLayout({children}:{children:React.ReactNode}) {
  return (
    <HelmetProvider>
        <Title/>
        {children}
    </HelmetProvider>
  )
}
