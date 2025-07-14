import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Heart, 
  Wind, 
  Brain, 
  Droplets, 
  Activity,
  Accessibility,
  Settings,
  DollarSign,
  Target,
  Zap,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HealthData {
  age: string;
  gender: string;
  symptoms: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  bloodSugar: string;
  weight: string;
  height: string;
}

interface DiagnosticResult {
  condition: string;
  probability: number;
  icon: React.ReactNode;
  description: string;
  color: string;
}

export default function Diagnostics() {
  const { toast } = useToast();
  const [healthData, setHealthData] = useState<HealthData>({
    age: "",
    gender: "",
    symptoms: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    bloodSugar: "",
    weight: "",
    height: "",
  });
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const features = [
    {
      icon: <Accessibility className="h-12 w-12 text-foreground" />,
      title: "Improved accessibility",
      description: "AI makes it possible to offer healthcare services to underdeveloped countries and places with low accessibility"
    },
    {
      icon: <Settings className="h-12 w-12 text-foreground" />,
      title: "Early diagnosis",
      description: "Helps to discover the disease in the early stages and thus increases the chances of recovery"
    },
    {
      icon: <DollarSign className="h-12 w-12 text-foreground" />,
      title: "Reduce cost",
      description: "AI improves the work of medical personnel and saves very expensive medical examinations and tests"
    },
    {
      icon: <Target className="h-12 w-12 text-foreground" />,
      title: "Accurate",
      description: "We use the top-performing machine learning algorithms and models to ensure highly accurate prediction"
    },
    {
      icon: <Zap className="h-12 w-12 text-foreground" />,
      title: "Quick Predictions",
      description: "With our app The patient has only to enter a few parameters personal information and get the diagnosis in seconds"
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-foreground" />,
      title: "No Human Errors",
      description: "The use of AI in medicine reduces the involvement of humans by automating medical procedures which eliminates the risk of human error"
    }
  ];

  const medicalModels = [
    {
      title: "Liver Disease",
      image: "liver.jpg"
    },
    {
      title: "Pneumonia",
      image: "pueomonia.jpeg"
    },
    {
      title: "Kidney Disease", 
      image: "kidney.jpg"
    },
    {
      title: "Diabetes",
      image: "diabetes.jpeg"
    },
    {
      title: "Stroke",
      image: "stroke.jpeg"
    },
    {
      title: "Heart Disease",
      image: "heart.jpeg"
    }
  ];

  const handleInputChange = (field: keyof HealthData, value: string) => {
    setHealthData(prev => ({ ...prev, [field]: value }));
  };

  const analyzeHealth = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock diagnostic logic based on input data
    const diagnosticResults: DiagnosticResult[] = [];

    const age = parseInt(healthData.age);
    const heartRate = parseInt(healthData.heartRate);
    const bloodSugar = parseInt(healthData.bloodSugar);
    const temp = parseFloat(healthData.temperature);
    const symptoms = healthData.symptoms.toLowerCase();

    // Diabetes risk
    if (bloodSugar > 126 || (age > 45 && bloodSugar > 100)) {
      diagnosticResults.push({
        condition: "Diabetes Risk",
        probability: bloodSugar > 126 ? 85 : 65,
        icon: <Droplets className="h-5 w-5" />,
        description: "Elevated blood glucose levels detected",
        color: "text-warning"
      });
    }

    // Heart disease risk
    if (heartRate > 100 || symptoms.includes("chest pain") || symptoms.includes("shortness of breath")) {
      diagnosticResults.push({
        condition: "Heart Disease Risk",
        probability: 72,
        icon: <Heart className="h-5 w-5" />,
        description: "Cardiovascular symptoms detected",
        color: "text-destructive"
      });
    }

    // Pneumonia risk
    if ((temp > 101.3 && (symptoms.includes("cough") || symptoms.includes("fever"))) || symptoms.includes("breathing")) {
      diagnosticResults.push({
        condition: "Pneumonia Risk",
        probability: 68,
        icon: <Wind className="h-5 w-5" />,
        description: "Respiratory symptoms with fever detected",
        color: "text-info"
      });
    }

    // Stroke risk
    if (symptoms.includes("headache") || symptoms.includes("dizziness") || symptoms.includes("numbness")) {
      diagnosticResults.push({
        condition: "Stroke Risk",
        probability: 45,
        icon: <Brain className="h-5 w-5" />,
        description: "Neurological symptoms detected",
        color: "text-secondary"
      });
    }

    // If no specific risks, show low risk
    if (diagnosticResults.length === 0) {
      diagnosticResults.push({
        condition: "Low Risk Profile",
        probability: 95,
        icon: <Activity className="h-5 w-5" />,
        description: "Your health parameters appear normal",
        color: "text-success"
      });
    }

    setResults(diagnosticResults);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: "Your health assessment results are ready.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-center py-16 space-y-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Stethoscope className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">HealthCare HMS</h1>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Models Section */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our models</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicalModels.map((model, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <img 
                  src={model.image} 
                  alt={model.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-center">{model.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Diagnostic Tool Section */}
      <div className="bg-muted/30 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Try Our AI Diagnostic Tool</h2>
            <p className="text-muted-foreground">Enter your health data to get instant AI-powered health insights</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Health Information
                </CardTitle>
                <CardDescription>
                  Please provide your current health data for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 35"
                      value={healthData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      placeholder="Male/Female"
                      value={healthData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                    <Input
                      id="heartRate"
                      type="number"
                      placeholder="e.g., 72"
                      value={healthData.heartRate}
                      onChange={(e) => handleInputChange("heartRate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bloodPressure">Blood Pressure</Label>
                    <Input
                      id="bloodPressure"
                      placeholder="e.g., 120/80"
                      value={healthData.bloodPressure}
                      onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="temperature">Temperature (°F)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 98.6"
                      value={healthData.temperature}
                      onChange={(e) => handleInputChange("temperature", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                    <Input
                      id="bloodSugar"
                      type="number"
                      placeholder="e.g., 100"
                      value={healthData.bloodSugar}
                      onChange={(e) => handleInputChange("bloodSugar", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="symptoms">Current Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe any symptoms you're experiencing (e.g., cough, fever, chest pain, headache, etc.)"
                    value={healthData.symptoms}
                    onChange={(e) => handleInputChange("symptoms", e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={analyzeHealth} 
                  className="w-full" 
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Health Data"}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Diagnostic Results
                </CardTitle>
                <CardDescription>
                  AI-powered health risk assessment based on your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Enter your health information and click "Analyze Health Data" to see results
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={result.color}>{result.icon}</span>
                            <h3 className="font-semibold">{result.condition}</h3>
                          </div>
                          <Badge variant={result.probability > 70 ? "destructive" : result.probability > 50 ? "secondary" : "outline"}>
                            {result.probability}% probability
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{result.description}</p>
                        <div className="mt-2 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2 transition-all duration-500"
                            style={{ width: `${result.probability}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Disclaimer:</strong> This is a simulated diagnostic tool for demonstration purposes only. 
                        Always consult with healthcare professionals for accurate medical diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}