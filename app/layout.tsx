import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"] });

//Components
import SideBar from "@/components/sidebar";
import Header from "@/components/header";

//Context
import DateContextProvider from "./utils/context/dateContext";
import AppointmentsContextProvider from "./utils/context/appointmentsContext";
import UtilsContextProvider from "./utils/context/utilsContext";

export const metadata: Metadata = {
  title: "Lorem - Miguel Sandino M. Palileo",
  description: "Senior React Developer Job Examination by Miguel Sandino M. Palileo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
      <link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css" />
      </head>
      <body className={`${urbanist.className} bg-white overflow-hidden`}>
        <div className='flex h-screen'>
          <SideBar />
          <DateContextProvider>
            <AppointmentsContextProvider>
              <UtilsContextProvider>
                <div className="grow">
                  <Header />
                  {children}
                </div>
              </UtilsContextProvider>
            </AppointmentsContextProvider>
          </DateContextProvider>
        </div>
      </body>
    </html>
  );
}