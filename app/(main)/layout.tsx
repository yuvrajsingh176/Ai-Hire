import { ReactNode } from "react"
import DashboardProvider from "./provider"

const DashboardLayout = ({children}:{children:ReactNode}) => {
  return (
      <DashboardProvider>
        <div className=" w-full">
        {children}
        </div>
      </DashboardProvider>
  )
}

export default DashboardLayout
