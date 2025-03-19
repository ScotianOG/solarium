import { Check } from 'lucide-react'

interface DeploymentStepsProps {
  currentStep: number
}

export function DeploymentSteps({ currentStep }: DeploymentStepsProps) {
  const steps = [
    "Configure Agent",
    "Collection Details",
    "Review & Deploy"
  ]

  return (
    <div className="relative">
      <div className="absolute top-5 left-6 right-6 h-0.5 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1
          const isCurrent = currentStep === index + 1
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isCompleted
                    ? "bg-gradient-to-r from-cyan-400 to-purple-600 border-transparent"
                    : isCurrent
                    ? "border-cyan-400 bg-[#161616]"
                    : "border-gray-800 bg-[#161616]"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className={isCurrent ? "text-cyan-400" : "text-gray-400"}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  isCurrent ? "text-white" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

