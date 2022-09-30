import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Calendar from "react-calendar";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const Home: NextPage = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Layout>
      {/* User component */}
      <section className="flex flex-row gap-x-4 bg-neutral-100 p-2">
        <div className="h-16 w-16 rounded-full bg-gray-600"></div>
        <div className="flex flex-col gap-1 text-gray-800">
          <h1 className="text-lg font-semibold ">Sinan Gürcan</h1>
          <h4 className="text-sm">BILGISAYAR MUHENDISLIGI</h4>
          <div className="flex flex-row gap-x-2">
            <div className="cursor-pointer rounded-xl bg-yellow-100 px-2 py-1 font-light text-yellow-700 shadow-sm transition-all hover:bg-yellow-200">
              250 bakiye
            </div>
            <div className="cursor-pointer rounded-xl bg-green-100 px-2 py-1 font-light text-green-700 shadow-sm transition-all hover:bg-green-200">
              4 Rezervasyon
            </div>
          </div>
        </div>
      </section>
      {/* Calendar */}
      <section>
        <FullCalendar
          locale={"tr"}
          weekends={false}
          initialView={"dayGridMonth"}
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={() => console.log(123)}
          dayHeaderClassNames="bg-blue-100 text-gray-800"
        />
      </section>
    </Layout>
  );
};

export default Home;
