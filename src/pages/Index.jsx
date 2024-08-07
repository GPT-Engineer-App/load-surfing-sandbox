import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, ChevronLeft, ChevronRight, Paw, Heart, Camera, Music, Volume2 } from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr, meow, and chirp.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats have 230 bones, while humans only have 206.",
  "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
  "Cats can rotate their ears 180 degrees.",
  "A cat's hearing is much more sensitive than a human's or dog's.",
];

const catBreeds = [
  { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", description: "Known for their distinctive color points and blue almond-shaped eyes.", popularity: 85 },
  { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", description: "Characterized by their long, fluffy coat and round face.", popularity: 80 },
  { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", description: "One of the largest domesticated cat breeds, known for their intelligence and playful personality.", popularity: 90 },
  { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", description: "Developed to look like exotic jungle cats such as leopards and ocelots.", popularity: 75 },
  { name: "British Shorthair", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg", description: "Known for their dense, plush coat and round face with chubby cheeks.", popularity: 70 },
];

const catSounds = [
  { name: "Meow", url: "https://example.com/meow.mp3" },
  { name: "Purr", url: "https://example.com/purr.mp3" },
  { name: "Hiss", url: "https://example.com/hiss.mp3" },
];

const Index = () => {
  const [catFact, setCatFact] = useState("");
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [progress, setProgress] = useState(13);
  const [volume, setVolume] = useState(50);
  const controls = useAnimation();
  const { toast } = useToast();
  const audioRef = useRef(null);

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

  const handleLike = () => {
    setLikeCount((prevCount) => prevCount + 1);
    setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
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

  const playCatSound = (url) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.volume = volume / 100;
      audioRef.current.play();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 to-indigo-100">
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
          <Tabs defaultValue="characteristics" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds">Breeds</TabsTrigger>
              <TabsTrigger value="sounds">Cat Sounds</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-purple-100 to-indigo-100">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-700">Characteristics of Cats</CardTitle>
                  <CardDescription>What makes cats unique?</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-none pl-0 space-y-2">
                    {["Independent nature", "Excellent hunters with sharp claws and teeth", "Flexible bodies and quick reflexes", "Keen senses, especially hearing and night vision", "Communicate through vocalizations, body language, and scent"].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-2 text-gray-700"
                      >
                        <Paw className="h-4 w-4 text-purple-500" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-pink-100 to-red-100">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-pink-700">Popular Cat Breeds</CardTitle>
                  <CardDescription>Explore different cat breeds</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Button onClick={prevBreed} variant="outline" size="icon" className="bg-pink-200 hover:bg-pink-300"><ChevronLeft className="h-4 w-4" /></Button>
                    <h3 className="text-xl font-semibold text-pink-700">{catBreeds[currentBreedIndex].name}</h3>
                    <Button onClick={nextBreed} variant="outline" size="icon" className="bg-pink-200 hover:bg-pink-300"><ChevronRight className="h-4 w-4" /></Button>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentBreedIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img src={catBreeds[currentBreedIndex].image} alt={catBreeds[currentBreedIndex].name} className="w-full h-64 object-cover rounded-lg mb-4 shadow-lg" />
                      <p className="text-sm text-gray-600 mb-4">{catBreeds[currentBreedIndex].description}</p>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold mr-2">Popularity:</span>
                        <Progress value={catBreeds[currentBreedIndex].popularity} className="w-full h-2" />
                        <span className="text-sm ml-2">{catBreeds[currentBreedIndex].popularity}%</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sounds">
              <Card className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-100 to-green-100">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-700">Cat Sounds</CardTitle>
                  <CardDescription>Listen to various cat vocalizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {catSounds.map((sound, index) => (
                      <Button
                        key={index}
                        onClick={() => playCatSound(sound.url)}
                        className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Music className="mr-2 h-4 w-4" />
                        {sound.name}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center">
                    <Volume2 className="mr-2 h-4 w-4 text-blue-700" />
                    <Slider
                      value={[volume]}
                      onValueChange={(value) => setVolume(value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <span className="ml-2 text-sm font-semibold text-blue-700">{volume}%</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-8 bg-gradient-to-br from-green-100 to-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-700">Cat Fact Generator</CardTitle>
                <CardDescription>Learn interesting facts about cats!</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={generateCatFact} 
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                      className="mt-4 p-4 bg-white bg-opacity-50 rounded-lg shadow-inner"
                    >
                      <p className="text-gray-800 font-medium">{catFact}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mb-8 bg-gradient-to-br from-yellow-100 to-orange-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-yellow-700">Cat Love Meter</CardTitle>
                <CardDescription>Show your love for cats!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={handleLike}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Like Cats
                  </Button>
                  <span className="text-lg font-semibold text-orange-700">{likeCount} Likes</span>
                </div>
                <div className="mt-4">
                  <Progress value={progress} className="w-full h-2" />
                  <p className="text-sm text-gray-600 mt-2">Cat love progress: {progress}%</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="mb-8 bg-gradient-to-br from-purple-100 to-pink-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-700">Cat Popularity Trends</CardTitle>
              <CardDescription>See how cat breeds popularity has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={catBreeds}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="popularity" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
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

      <audio ref={audioRef} />
    </div>
  );
};

export default Index;
