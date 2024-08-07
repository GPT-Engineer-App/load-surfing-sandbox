import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, ChevronLeft, ChevronRight, Paw } from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr, meow, and chirp.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats have 230 bones, while humans only have 206.",
  "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
];

const catBreeds = [
  { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", description: "Known for their distinctive color points and blue almond-shaped eyes." },
  { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", description: "Characterized by their long, fluffy coat and round face." },
  { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", description: "One of the largest domesticated cat breeds, known for their intelligence and playful personality." },
  { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", description: "Developed to look like exotic jungle cats such as leopards and ocelots." },
  { name: "British Shorthair", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg", description: "Known for their dense, plush coat and round face with chubby cheeks." },
];

const Index = () => {
  const [catFact, setCatFact] = useState("");
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const controls = useAnimation();
  const { toast } = useToast();

  const generateCatFact = async () => {
    await controls.start({ opacity: 0, y: 20 });
    const randomFact = catFacts[Math.floor(Math.random() * catFacts.length)];
    setCatFact(randomFact);
    await controls.start({ opacity: 1, y: 0 });
    toast({
      title: "New Cat Fact!",
      description: "Did you know? " + randomFact,
      duration: 5000,
    });
  };

  const nextBreed = () => {
    setCurrentBreedIndex((prevIndex) => (prevIndex + 1) % catBreeds.length);
  };

  const prevBreed = () => {
    setCurrentBreedIndex((prevIndex) => (prevIndex - 1 + catBreeds.length) % catBreeds.length);
  };

  useEffect(() => {
    const parallaxEffect = () => {
      const scrolled = window.scrollY;
      const parallax = document.querySelector(".parallax");
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    };

    window.addEventListener("scroll", parallaxEffect);
    return () => window.removeEventListener("scroll", parallaxEffect);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 fixed w-full z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Paw className="mr-2" />
            CatWorld
          </h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="flex-grow pt-16">
        <div className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 parallax">
            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Cat" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-6xl font-bold text-white shadow-lg text-center"
            >
              Welcome to the<br />Fascinating World of Cats
            </motion.h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          >
            <Card className="transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle>Characteristics of Cats</CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Independent nature</li>
                  <li>Excellent hunters with sharp claws and teeth</li>
                  <li>Flexible bodies and quick reflexes</li>
                  <li>Keen senses, especially hearing and night vision</li>
                  <li>Communicate through vocalizations, body language, and scent</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
                <CardDescription>Explore different cat breeds</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Button onClick={prevBreed} variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                  <h3 className="text-xl font-semibold">{catBreeds[currentBreedIndex].name}</h3>
                  <Button onClick={nextBreed} variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBreedIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={catBreeds[currentBreedIndex].image} alt={catBreeds[currentBreedIndex].name} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <p className="text-sm text-gray-600">{catBreeds[currentBreedIndex].description}</p>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Cat Fact Generator</CardTitle>
                <CardDescription>Learn interesting facts about cats!</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={generateCatFact} 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Paw className="mr-2 h-4 w-4" />
                  Generate Cat Fact
                </Button>
                <AnimatePresence mode="wait">
                  {catFact && (
                    <motion.div
                      key={catFact}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner"
                    >
                      <p>{catFact}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 CatWorld. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition-colors"><Instagram /></a>
            <a href="#" className="hover:text-gray-300 transition-colors"><Facebook /></a>
            <a href="#" className="hover:text-gray-300 transition-colors"><Twitter /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
