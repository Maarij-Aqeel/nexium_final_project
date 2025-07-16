import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const useCases = [
  {
    title: "Students & Graduates",
    description:
      "Practice mock interviews to build confidence and enhance communication and technical skills before real-world opportunities.",
    icon: "https://img.icons8.com/?size=100&id=38833&format=png&color=000000",
  },
  {
    title: "Junior Developers",
    description:
      "Sharpen your coding interview responses with AI-driven voice practice tailored to early-career roles.",
    icon: "https://img.icons8.com/?size=100&id=53381&format=png&color=000000",
  },
  {
    title: "Bootcamp Trainees",
    description:
      "Reinforce your learning journey with realistic, scenario-based AI interviews that simulate actual job interviews.",
    icon: "https://img.icons8.com/?size=100&id=14614&format=png&color=000000",
  },
  {
    title: "HR & Recruiters",
    description:
      "Automate candidate screening with AI-conducted interviews and get structured, real-time evaluation reports.",
    icon: "https://img.icons8.com/?size=100&id=118404&format=png&color=000000",
  },
];

export default function UseCases() {
  return (
    <section className="py-20 px-6 bg-background/80">
      <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-bold text-center mb-12">
        Who Is This For?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {useCases.map((useCase, index) => (
          <Card
            key={index}
            className="p-6 hover:scale-[1.03] hover:border-primary h-full hover:shadow-2xl transition-all duration-300 ease-out rounded-2xl border-primary/20"
          >
            <CardHeader className="flex flex-col items-center gap-4 text-center">
              <div className="bg-primary/60 p-4 rounded-full">
                <img
                  src={useCase.icon}
                  alt={useCase.title}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <CardTitle className="text-2xl font-semibold">{useCase.title}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {useCase.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
