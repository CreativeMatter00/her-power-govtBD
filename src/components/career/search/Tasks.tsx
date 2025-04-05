"use client";
import { useTranslations } from "next-intl";
import TaskCard from "../careerHome/TaskCard";

const Tasks = ({
  data,
  searchName,
}: {
  data: any;
  searchName: string | null;
}) => {
  const t = useTranslations("career");

  return (
    <div className="container mx-auto">
      <div className="w-full px-3 py-3 bg-brandLsSecondary text-xl font-bold">
        {t("Taskssearchfor")} {`${searchName}`}
      </div>

      {data?.length === 0 ? (
        <div className="w-full min-h-52 flex justify-center items-center">
          {t("Thereisnotasksfor")} {searchName}.
        </div>
      ) : (
        <div className="mt-10">
          <div className="w-full grid grid-cols-2 gap-5 mt-5">
            {data.map((task: any, index: number) => (
              <TaskCard
                key={index}
                id={task.taskpost_pid}
                title={task.jobtitle}
                description={task.jobdescription}
                time={task.duration}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
