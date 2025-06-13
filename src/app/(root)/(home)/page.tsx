"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon, CalendarIcon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";

export default function Home() {
  const router = useRouter();

  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8">
      {/* WELCOME SECTION */}
      <div className="rounded-xl bg-card p-8 border shadow-sm hover-card">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CalendarIcon className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">
              Welcome back!
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {isInterviewer
                ? "Manage your interviews and review candidates effectively"
                : "Access your upcoming interviews and preparations"}
            </p>
          </div>
        </div>
      </div>

      {isInterviewer ? (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {QUICK_ACTIONS.map((action) => (
                <ActionCard
                  key={action.title}
                  action={action}
                  onClick={() => handleQuickAction(action.title)}
                />
              ))}
            </div>
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CalendarIcon className="size-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Your Interviews</h2>
                <p className="text-muted-foreground">View and join your scheduled interviews</p>
              </div>
            </div>

            <div className="mt-8">
              {interviews === undefined ? (
                <div className="flex justify-center py-12">
                  <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : interviews.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {interviews.map((interview) => (
                    <MeetingCard key={interview._id} interview={interview} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed p-12 text-center">
                  <div className="mx-auto size-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <CalendarIcon className="size-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No interviews scheduled</h3>
                  <p className="text-muted-foreground mt-2">
                    You have no scheduled interviews at the moment
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}