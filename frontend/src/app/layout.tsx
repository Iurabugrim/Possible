"use client"
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import { Divider } from "antd";
import { usePathname } from "next/navigation";
import {QueryClientProvider, QueryClient} from "react-query"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const withPublicLayout = !pathname.startsWith("/admin")

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          {withPublicLayout ? (
            <div className="container">
              <Header />
              {children}
              <Divider className={"bg-white my-5"} />
              <Footer />
            </div>
          ) : (
            <>
              {children}
            </>
          )}
        </body>
      </QueryClientProvider>
    </html>
  )
}
