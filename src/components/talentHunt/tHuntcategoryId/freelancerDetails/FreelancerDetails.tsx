import Summary from "./summary/Summary";
import FreelancerWorkHistorySkills from "./freelancerWorkHistorySkills/FreelancerWorkHistorySkills";
import ProfileInfo from "./profileInfo/ProfileInfo";

const FreelancerDetails = () => {
  return (
    <>
      <section className="bg-brandLsSecondary">
        <main className="container p-4">
          {/* =================== PROFILE INFO ======================= */}
          <div className="flex flex-col gap-4">
            <ProfileInfo />

            {/* ================= EARNING, JOBS, HOURS, DEVELOPER, HISTORY , SKILLS ================ */}

            <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
              <div className="md:col-span-1">
                {/* ====== TOTAL EARNINGS, JOBS, WORK HOUR, LINKED IN ACCOUNT =================== */}
                <Summary />
              </div>
              <div className="md:col-span-3">
                {/* ===================== DEVELOPER, HISTORY, SKILSS ==================== */}
                <FreelancerWorkHistorySkills />
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default FreelancerDetails;
