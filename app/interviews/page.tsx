import FadeWrapper from "@/components/FadeWrapper";
import InterviewCards from "@/components/InterviewCards";

export default function InterviewSelector() {
  return (
    <FadeWrapper>
      <div className=" relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden bg-hero-gradient py-24">
      {/* Top Heading */}
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Choose Your Interview
          </h1>

          <p className="text-lg text-center  md:text-xl  text-muted-foreground">
            Select from our curated collection of technical interviews tailored to your role and experience level.
          </p>
        </div>

        <div className="mt-10 py-8">
            <InterviewCards/>
        </div>
      </div>
    </FadeWrapper>
  );
}
