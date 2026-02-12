import { Movie, Episode } from "../types";

// Standard reliable resolution for posters
const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';
// High resolution for backdrops
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

// --- INTERNAL DATABASE ---
const FALLBACK_DB: Movie[] = [
  // --- UPCOMING / NEW ---
  {
    id: "1291608",
    title: "Dhurandhar",
    description: "In the early 2000s, an Indian undercover operative infiltrates Karachi's underworld, breaking into its inner circle to dismantle a violent nexus from within.",
    genre: ["Action", "Thriller"],
    imageUrl: "https://f.woowoowoowoo.net/resize/250x400/f8/94/f894ce56db073cc57e28705682920c27/f894ce56db073cc57e28705682920c27.jpg",
    backdropUrl: "https://f.woowoowoowoo.net/resize/1200x600/44/f5/44f5ac493d3d0d808e41432e8cca434b/44f5ac493d3d0d808e41432e8cca434b.jpg",
    matchScore: 98,
    year: 2025,
    duration: "3h 32m",
    rating: "PG-13",
    mediaType: "movie"
  },
  
  // --- MARVEL CINEMATIC UNIVERSE ---
  {
    id: "299534",
    title: "Avengers: Endgame",
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    genre: ["Action", "Sci-Fi", "Adventure"],
    imageUrl: `${POSTER_BASE}/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg`,
    backdropUrl: `${BACKDROP_BASE}/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg`,
    matchScore: 99,
    year: 2019,
    duration: "3h 1m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "299536",
    title: "Avengers: Infinity War",
    description: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos.",
    genre: ["Action", "Sci-Fi", "Adventure"],
    imageUrl: `${POSTER_BASE}/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg`,
    backdropUrl: `${BACKDROP_BASE}/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg`,
    matchScore: 98,
    year: 2018,
    duration: "2h 29m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "634649",
    title: "Spider-Man: No Way Home",
    description: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous.",
    genre: ["Action", "Sci-Fi", "Adventure"],
    imageUrl: `${POSTER_BASE}/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg`,
    backdropUrl: `${BACKDROP_BASE}/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg`,
    matchScore: 98,
    year: 2021,
    duration: "2h 28m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "1726",
    title: "Iron Man",
    description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
    genre: ["Action", "Sci-Fi"],
    imageUrl: `${POSTER_BASE}/78lPtwv72eTNqFW9COBYI0dWDJa.jpg`,
    backdropUrl: `${BACKDROP_BASE}/cyecB7godJ6kNHGONFjUyVN9OX5.jpg`,
    matchScore: 95,
    year: 2008,
    duration: "2h 6m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "284054",
    title: "Black Panther",
    description: "King T'Challa returns home to the isolated, technologically advanced African nation of Wakanda to serve as his country's new leader.",
    genre: ["Action", "Sci-Fi", "Adventure"],
    imageUrl: `${POSTER_BASE}/uxzzxijgPIY7slzFvMotPv8wjKA.jpg`,
    backdropUrl: `${BACKDROP_BASE}/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg`,
    matchScore: 96,
    year: 2018,
    duration: "2h 14m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "283995",
    title: "Guardians of the Galaxy Vol. 2",
    description: "The Guardians must fight to keep their newfound family together as they unravel the mysteries of Peter Quill's true parentage.",
    genre: ["Action", "Sci-Fi", "Comedy"],
    imageUrl: `${POSTER_BASE}/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg`,
    backdropUrl: `${BACKDROP_BASE}/aJn9XeesqsrSLKcHfHP4u5985hn.jpg`,
    matchScore: 94,
    year: 2017,
    duration: "2h 16m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "85271",
    title: "WandaVision",
    description: "Wanda Maximoff and Vision—two super-powered beings living idealized suburban lives—begin to suspect that everything is not as it seems.",
    genre: ["Sci-Fi", "Drama", "Mystery"],
    imageUrl: `${POSTER_BASE}/glKDfE6btIRcVB5zrjspRIs4r52.jpg`,
    backdropUrl: `${BACKDROP_BASE}/57vVjteucIF3bGnZj6PwnMmNw5L.jpg`,
    matchScore: 92,
    year: 2021,
    duration: "1 Season",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 1
  },
  {
    id: "84958",
    title: "Loki",
    description: "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of 'Avengers: Endgame'.",
    genre: ["Sci-Fi", "Fantasy", "Adventure"],
    imageUrl: `${POSTER_BASE}/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg`,
    backdropUrl: `${BACKDROP_BASE}/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg`,
    matchScore: 94,
    year: 2021,
    duration: "2 Seasons",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 2
  },
  {
    id: "557",
    title: "Spider-Man",
    description: "After being bitten by a genetically altered spider, nerdish high school student Peter Parker is endowed with amazing powers.",
    genre: ["Action", "Fantasy"],
    imageUrl: `${POSTER_BASE}/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg`,
    backdropUrl: `${BACKDROP_BASE}/sWvlJWCYR35389AxWUNOxBJm1HK.jpg`,
    matchScore: 93,
    year: 2002,
    duration: "2h 1m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "558",
    title: "Spider-Man 2",
    description: "Peter Parker is dissatisfied with life when he loses his job, the love of his life, Mary Jane, and his powers. Amid all his chaos, he must fight Doctor Octavius.",
    genre: ["Action", "Fantasy"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/c1/2e/c12e55e258ecfed21ebfaa023c81ed38/c12e55e258ecfed21ebfaa023c81ed38.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/6iQ4CMtYpHRCP3f2dMJSVn6yL5i.jpg`,
    matchScore: 96,
    year: 2004,
    duration: "2h 7m",
    rating: "PG-13",
    mediaType: "movie"
  },
   {
    id: "36657",
    title: "X-Men",
    description: "Two mutants, Wolverine and Rogue, come into a conflict between two groups that have radically different approaches to bringing about the acceptance of mutant-kind.",
    genre: ["Action", "Sci-Fi"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/2a/a5/2aa51e4d8f32f842711f94a2624885d6/2aa51e4d8f32f842711f94a2624885d6.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/2yQUnpc1BXGE7KwKKUeM2e1eS5.jpg`,
    matchScore: 90,
    year: 2000,
    duration: "1h 44m",
    rating: "PG-13",
    mediaType: "movie"
  },

  // --- DC COLLECTION ---
  {
    id: "155",
    title: "The Dark Knight",
    description: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and DA Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    genre: ["Action", "Crime", "Drama"],
    imageUrl: `${POSTER_BASE}/qJ2tW6WMUDux911r6m7haRef0WH.jpg`,
    backdropUrl: `${BACKDROP_BASE}/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg`,
    matchScore: 99,
    year: 2008,
    duration: "2h 32m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "475557",
    title: "Joker",
    description: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
    genre: ["Crime", "Drama", "Thriller"],
    imageUrl: `${POSTER_BASE}/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg`,
    backdropUrl: `${BACKDROP_BASE}/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg`,
    matchScore: 97,
    year: 2019,
    duration: "2h 2m",
    rating: "R",
    mediaType: "movie"
  },
  {
    id: "49521",
    title: "Man of Steel",
    description: "An alien child is evacuated from his dying world and sent to Earth to live among humans. His peace is threatened when other survivors of his home planet invade Earth.",
    genre: ["Action", "Sci-Fi", "Adventure"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/bb/a7/bba7bf705a6b60bbec2dffba617052a1/bba7bf705a6b60bbec2dffba617052a1.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/x9pB8TPd71m0kU3eZ6jM1954n6a.jpg`,
    matchScore: 90,
    year: 2013,
    duration: "2h 23m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "209112",
    title: "Batman v Superman: Dawn of Justice",
    description: "Fearing the actions of a god-like Super Hero left unchecked, Gotham City’s own formidable, forceful vigilante takes on Metropolis’s most revered, modern-day savior.",
    genre: ["Action", "Sci-Fi"],
    imageUrl: `${POSTER_BASE}/5UsK3grJvtQrtzEgqNlDljJW96w.jpg`,
    backdropUrl: `${BACKDROP_BASE}/mX3WOJPBzzTXAmntYMZuAlzaBfp.jpg`,
    matchScore: 88,
    year: 2016,
    duration: "2h 32m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "297761",
    title: "Suicide Squad",
    description: "From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government.",
    genre: ["Action", "Crime", "Fantasy"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/7a/cf/7acf0b54bcac244a96fe9b169dd06d37/7acf0b54bcac244a96fe9b169dd06d37.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg`,
    matchScore: 86,
    year: 2016,
    duration: "2h 3m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "297762",
    title: "Wonder Woman",
    description: "An Amazon princess comes to the world of Man in the grips of the First World War to confront the forces of evil and bring an end to human conflict.",
    genre: ["Action", "Adventure", "Fantasy"],
    imageUrl: `${POSTER_BASE}/gfJGlDaHuWimErCr5Ql0I8x9QSy.jpg`,
    backdropUrl: `${BACKDROP_BASE}/6iUNcvkqpsz90LAq90N40vP7fN4.jpg`,
    matchScore: 93,
    year: 2017,
    duration: "2h 21m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "141052",
    title: "Justice League",
    description: "Fueled by his restored faith in humanity and inspired by Superman's selfless act, Bruce Wayne enlists the help of his newfound ally, Diana Prince, to face an even greater enemy.",
    genre: ["Action", "Sci-Fi", "Adventure"],
    imageUrl: `https://image.tmdb.org/t/p/w342/eifGNCSDuxJeS1loAXil5bIGgvC.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/jOrg1W2a65Z1tE2x0YpM7o5Cj9P.jpg`,
    matchScore: 89,
    year: 2017,
    duration: "2h 0m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "297802",
    title: "Aquaman",
    description: "Once home to the most advanced civilization on Earth, Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people and then the surface world.",
    genre: ["Action", "Adventure", "Fantasy"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/a5/23/a52340c33d8ff6a3cef4fc0c218b1844/a52340c33d8ff6a3cef4fc0c218b1844.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/9QusGjxcYvfPD1JHC611n32gAZQ.jpg`,
    matchScore: 92,
    year: 2018,
    duration: "2h 23m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "287947",
    title: "Shazam!",
    description: "A boy is given the ability to become an adult superhero in times of need with a single magic word.",
    genre: ["Action", "Comedy", "Fantasy"],
    imageUrl: `${POSTER_BASE}/xnopI5Xtky18MPhK40cZAGAOVeV.jpg`,
    backdropUrl: `${BACKDROP_BASE}/bi4jh0Kt0uuWOVfj9Is1vbXaUqb.jpg`,
    matchScore: 91,
    year: 2019,
    duration: "2h 12m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "791373",
    title: "Zack Snyder's Justice League",
    description: "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
    genre: ["Action", "Adventure", "Fantasy"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/3e/60/3e605a025d5bce6b9efd6ac088d6caa9/3e605a025d5bce6b9efd6ac088d6caa9.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg`,
    matchScore: 95,
    year: 2021,
    duration: "4h 2m",
    rating: "R",
    mediaType: "movie"
  },
  {
    id: "436270",
    title: "Black Adam",
    description: "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
    genre: ["Action", "Fantasy", "Sci-Fi"],
    imageUrl: `${POSTER_BASE}/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg`,
    backdropUrl: `${BACKDROP_BASE}/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg`,
    matchScore: 90,
    year: 2022,
    duration: "2h 5m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "414906",
    title: "The Batman",
    description: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    genre: ["Action", "Crime", "Drama"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/21/2d/212d2d95b9d515504a4de227d49a769f/212d2d95b9d515504a4de227d49a769f.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg`,
    matchScore: 94,
    year: 2022,
    duration: "2h 56m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "1669",
    title: "Constantine",
    description: "John Constantine is a man who has literally been to hell and back. When he teams up with skeptical policewoman Angela Dodson to solve the mysterious suicide of her twin sister, their investigation takes them through the world of demons and angels.",
    genre: ["Fantasy", "Horror", "Action"],
    imageUrl: `${POSTER_BASE}/vPYgvd2MwHlxTamAOjwVQp4qs1W.jpg`,
    backdropUrl: `${BACKDROP_BASE}/gG9f3h8wV73nN0Y2g5l65Y26vN.jpg`,
    matchScore: 92,
    year: 2005,
    duration: "2h 1m",
    rating: "R",
    mediaType: "movie"
  },
  {
    id: "1069279",
    title: "Superman",
    description: "Follows the titular superhero as he reconciles his heritage with his human upbringing. He is the embodiment of truth, justice and the American way in a world that views kindness as old-fashioned.",
    genre: ["Action", "Sci-Fi"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/b4/cc/b4cc4dcecd4967a92791f386b9542cd1/b4cc4dcecd4967a92791f386b9542cd1.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/a91e06d9-7607-4251-a9d1-39906d4e5114.jpg`, 
    matchScore: 100,
    year: 2025,
    duration: "Coming Soon",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "1003596",
    title: "The Fantastic Four: First Steps",
    description: "The Fantastic Four face their most daunting challenge yet as they must balance their lives as heroes with the strength of their family bond.",
    genre: ["Action", "Sci-Fi"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/c8/41/c841370457dc0859644a58ccef7e7726/c841370457dc0859644a58ccef7e7726.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/8rft8A9nG4q2u4y3.jpg`,
    matchScore: 99,
    year: 2025,
    duration: "Coming Soon",
    rating: "PG-13",
    mediaType: "movie"
  },

  // --- CW / ARROWVERSE & TV ---
  {
    id: "1412",
    title: "Arrow",
    description: "Spoiled billionaire playboy Oliver Queen is missing and presumed dead when his yacht is lost at sea. He returns five years later a changed man, determined to clean up the city as a hooded vigilante.",
    genre: ["Action", "Adventure", "Crime"],
    imageUrl: `${POSTER_BASE}/gKG5QGz5Ngf8fgWpBsWtlg5L2SF.jpg`,
    backdropUrl: `${BACKDROP_BASE}/fUn5I5f4069vwGFEEvA3HikiLpb.jpg`,
    matchScore: 95,
    year: 2012,
    duration: "8 Seasons",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 8
  },
  {
    id: "60735",
    title: "The Flash",
    description: "After being struck by lightning, Barry Allen wakes up from his coma to discover he's been given the power of super speed, becoming the next Flash, fighting crime in Central City.",
    genre: ["Drama", "Sci-Fi", "Action"],
    imageUrl: `${POSTER_BASE}/lJA2RCMfsWoskqlQhXPSLFQGXEJ.jpg`,
    backdropUrl: `${BACKDROP_BASE}/jC1KqsFx8ZyqJyQH2zsIKz8zMns.jpg`,
    matchScore: 94,
    year: 2014,
    duration: "9 Seasons",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 9
  },
  {
    id: "62688",
    title: "Supergirl",
    description: "Twenty-four-year-old Kara Zor-El, who was taken in by the Danvers family when she was 13 after being sent away from Krypton, must learn to embrace her new powers.",
    genre: ["Action", "Sci-Fi", "Adventure"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/5d/f8/5df8971f195fbf333bbd131e836fb7ce/5df8971f195fbf333bbd131e836fb7ce.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/4PCO7tewIGnE6ySjVf2DbJ3IdU.jpg`,
    matchScore: 92,
    year: 2015,
    duration: "6 Seasons",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 6
  },
  {
    id: "95057",
    title: "Superman & Lois",
    description: "After years of facing megalomaniacal supervillains, monsters wreaking havoc on Metropolis, and alien invaders intent on wiping out the human race, The Man of Steel aka Clark Kent and comic books' most famous journalist, Lois Lane, come face to face with one of their greatest challenges ever - dealing with all the stress, pressures and complexities that come with being working parents in today's society.",
    genre: ["Action", "Sci-Fi", "Drama"],
    imageUrl: `${POSTER_BASE}/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg`,
    backdropUrl: `${BACKDROP_BASE}/pS8v1T34H91c1Yk9y1C1G9j1j.jpg`,
    matchScore: 96,
    year: 2021,
    duration: "4 Seasons",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 4
  },
  
  // --- TV HITS ---
  {
    id: "70523",
    title: "Dark",
    description: "A missing child causes four families to help each other for answers. What they could not imagine is that this mystery would be connected to innumerable other secrets of the small town.",
    genre: ["Sci-Fi", "Mystery", "Drama"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/d8/c8/d8c89e3a326c9ab4427f7a93ad821170/d8c89e3a326c9ab4427f7a93ad821170.jpg`,
    backdropUrl: `https://f.woowoowoowoo.net/resize/1200x600/33/07/3307210675c0d56e93a69816e080363a/3307210675c0d56e93a69816e080363a.jpg`,
    matchScore: 99,
    year: 2017,
    duration: "3 Seasons",
    rating: "TV-MA",
    mediaType: "tv",
    totalSeasons: 3
  },
  {
    id: "1622",
    title: "Supernatural",
    description: "Two brothers follow their father's footsteps as hunters, fighting evil supernatural beings of many kinds, including monsters, demons and gods that roam the earth.",
    genre: ["Drama", "Mystery", "Sci-Fi"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/3e/84/3e84ab277355f4e9010028603e2d1b4e/3e84ab277355f4e9010028603e2d1b4e.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/nVRyd8vrBrG8tzkh954Ma5XRj5B.jpg`,
    matchScore: 98,
    year: 2005,
    duration: "15 Seasons",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 15
  },
  {
    id: "18165",
    title: "The Vampire Diaries",
    description: "The story of two vampire brothers obsessed with the same girl, who bears a striking resemblance to the beautiful but ruthless vampire they knew and loved in 1864.",
    genre: ["Drama", "Fantasy", "Horror"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/9a/2e/9a2e3494b96d12dcaded262e7a5ef061/9a2e3494b96d12dcaded262e7a5ef061.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/1q8861B5y0194QYjE4Lq4qN3Ooz.jpg`,
    matchScore: 96,
    year: 2009,
    duration: "8 Seasons",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 8
  },
  {
    id: "48866",
    title: "The 100",
    description: "Set ninety-seven years after a nuclear war has destroyed civilization, when a spaceship housing humanity's lone survivors sends one hundred juvenile delinquents back to Earth.",
    genre: ["Sci-Fi", "Drama", "Action"],
    imageUrl: `${POSTER_BASE}/wcaDIAG1QdXQLRaj4vC1EFdBT2.jpg`,
    backdropUrl: `${BACKDROP_BASE}/hTExot1sfn7dHZjGrk0Aiwpntxt.jpg`,
    matchScore: 95,
    year: 2014,
    duration: "7 Seasons",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 7
  },
  
  // --- REQUESTED SPECIFICS ---
  {
    id: "1668",
    title: "Friends",
    description: "Six young people, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.",
    genre: ["Comedy", "Drama"],
    imageUrl: `${POSTER_BASE}/f496cm9enuEsZkSPzCwnTESEK5s.jpg`,
    backdropUrl: `${BACKDROP_BASE}/l0qVZIpXtIo7km9u5Yqn0nLV206.jpg`,
    matchScore: 100,
    year: 1994,
    duration: "10 Seasons",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 10
  },
  {
    id: "20453",
    title: "3 Idiots",
    description: "In college, Farhan and Raju form a great bond with Rancho due to his positive and refreshing outlook to life. Years later, a bet gives them a chance to look for their long-lost friend whose existence seems rather elusive.",
    genre: ["Comedy", "Drama"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/66/6e/666e8ba711649adde074de672b2e70e0/666e8ba711649adde074de672b2e70e0.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/ulMscezy9YX0bhknvJbZoUgQxO5.jpg`,
    matchScore: 98,
    year: 2009,
    duration: "2h 50m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "1265",
    title: "Bridge to Terabithia",
    description: "Jesse Aarons trained all summer to become the fastest runner in school, so he's very upset when newcomer Leslie Burke outruns him and everyone else.",
    genre: ["Adventure", "Drama", "Family"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/b6/0d/b60d5bff8a78f6e36772fc989f67ece1/b60d5bff8a78f6e36772fc989f67ece1.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/vF3507116zN8X0s3YOr9Q9jYV7G.jpg`,
    matchScore: 94,
    year: 2007,
    duration: "1h 36m",
    rating: "PG",
    mediaType: "movie"
  },

  // --- GENERAL POPULAR ---
  {
    id: "27205",
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: ["Action", "Sci-Fi"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/2d/03/2d0304dfe44b3e7e2cccc313b7ec6104/2d0304dfe44b3e7e2cccc313b7ec6104.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/s3TBrRGB1jav7fwSaGj7wZGMGEq.jpg`,
    matchScore: 96,
    year: 2010,
    duration: "2h 28m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "693134",
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    genre: ["Sci-Fi", "Adventure"],
    imageUrl: `${POSTER_BASE}/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg`,
    backdropUrl: `${BACKDROP_BASE}/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg`,
    matchScore: 98,
    year: 2024,
    duration: "2h 46m",
    rating: "PG-13",
    mediaType: "movie"
  },
  {
    id: "94997",
    title: "House of the Dragon",
    description: "An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.",
    genre: ["Action", "Fantasy"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/2a/4b/2a4b982a36376b1549ae928dc85c92fc/2a4b982a36376b1549ae928dc85c92fc.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/aaq1S5n98tI59A72251yM9s10xQ.jpg`,
    matchScore: 95,
    year: 2022,
    duration: "2 Seasons",
    rating: "TV-MA",
    mediaType: "tv",
    totalSeasons: 2
  },
  {
    id: "66732",
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    genre: ["Sci-Fi", "Horror"],
    imageUrl: `${POSTER_BASE}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`,
    backdropUrl: `${BACKDROP_BASE}/56v2KjBlU4XaOv9rVYkJu64COcfe.jpg`,
    matchScore: 98,
    year: 2016,
    duration: "5 Seasons",
    rating: "TV-14",
    mediaType: "tv",
    totalSeasons: 5
  },
  {
    id: "1396",
    title: "Breaking Bad",
    description: "A high school chemistry teacher turned meth producer navigates the dangers of the criminal underworld to secure his family's future.",
    genre: ["Crime", "Drama"],
    imageUrl: `https://f.woowoowoowoo.net/resize/250x400/7a/78/7a78d2a44e33d64d6c35e1a2c1e2cdc9/7a78d2a44e33d64d6c35e1a2c1e2cdc9.jpg`, // UPDATED
    backdropUrl: `${BACKDROP_BASE}/tsRy63Mu5CU8etx1Ol/9j.jpg`,
    matchScore: 99,
    year: 2008,
    duration: "5 Seasons",
    rating: "TV-MA",
    mediaType: "tv",
    totalSeasons: 5
  },
  {
    id: "76600",
    title: "Avatar: The Way of Water",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
    genre: ["Sci-Fi", "Adventure"],
    imageUrl: `${POSTER_BASE}/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg`,
    backdropUrl: `${BACKDROP_BASE}/8rpDcsfLJypbO6vREc05475qg9f.jpg`,
    matchScore: 95,
    year: 2022,
    duration: "3h 12m",
    rating: "PG-13",
    mediaType: "movie"
  }
];

// Helper to get consistent episodes using TVMaze API (Public & Free)
export const fetchShowEpisodes = async (showTitle: string, season: number): Promise<Episode[]> => {
    try {
        // 1. Search for the show to get TVMaze ID
        const searchRes = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(showTitle)}`);
        if (!searchRes.ok) throw new Error('Show not found');
        const showData = await searchRes.json();
        
        // 2. Fetch episodes
        const episodesRes = await fetch(`https://api.tvmaze.com/shows/${showData.id}/episodes`);
        if (!episodesRes.ok) throw new Error('Episodes not found');
        const allEpisodes = await episodesRes.json();

        // 3. Filter by season
        // TVMaze uses 'season' (number) and 'number' (episode number)
        const seasonEpisodes = allEpisodes.filter((ep: any) => ep.season === season);
        
        if (seasonEpisodes.length > 0) {
            return seasonEpisodes.map((ep: any) => ({
                episode: ep.number,
                title: ep.name
            }));
        }
    } catch (e) {
        console.warn("TVMaze fetch failed", e);
    }

    // Fallback if API fails
    return Array.from({ length: 24 }, (_, i) => ({ 
        episode: i + 1, 
        title: `Episode ${i + 1}` 
    }));
};

const shuffle = (array: Movie[]) => {
    return [...array].sort(() => 0.5 - Math.random());
};

// Returns content strictly from the internal database for reliability
export const fetchMoviesForCategory = async (categoryName: string): Promise<Movie[]> => {
    switch(categoryName) {
        case "Marvel Universe": 
            return FALLBACK_DB.filter(m => [
                "299534", "299536", "634649", "1726", "284054", "283995", 
                "85271", "84958", "557", "558", "36657", "1003596"
            ].includes(m.id));
        
        case "DC Universe": 
            return FALLBACK_DB.filter(m => [
                "155", "475557", "49521", "209112", "297761", "297762", "141052", 
                "297802", "287947", "791373", "436270", "414906", "1069279", "1669", "1412", "60735", "62688", "95057"
            ].includes(m.id));
        
        case "CW TV Shows": 
            return FALLBACK_DB.filter(m => ["1412", "60735", "62688", "95057", "48866"].includes(m.id));

        case "TV Hits": 
            return FALLBACK_DB.filter(m => ["70523", "1622", "18165", "66732", "1396", "1668", "94997"].includes(m.id));
            
        case "Action Hits": 
            return FALLBACK_DB.filter(m => m.mediaType === 'movie' && m.genre.includes("Action"));

        case "Family & Comedy": 
             return FALLBACK_DB.filter(m => ["1668", "20453", "1265", "283995", "287947"].includes(m.id));

        case "Trending Now":
        default: 
            return shuffle(FALLBACK_DB).slice(0, 10);
    }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
    if (!query) return [];
    
    // Purely internal search
    const lowerQuery = query.toLowerCase();
    return FALLBACK_DB.filter(m => 
        m.title.toLowerCase().includes(lowerQuery) || 
        m.genre.some(g => g.toLowerCase().includes(lowerQuery))
    );
};

// Helper to efficiently retrieve movies by a list of IDs for "Continue Watching"
export const getMoviesByIds = async (ids: string[]): Promise<Movie[]> => {
    return FALLBACK_DB.filter(m => ids.includes(m.id));
};

// Returns a random high-quality movie for the hero banner to ensure valid backdrops
// Context 'tv' forces "The 100", 'general' forces Batman/Dune 2
export const fetchHeroMovie = async (context: 'general' | 'tv' = 'general'): Promise<Movie> => {
    let heroIds: string[] = [];
    
    if (context === 'tv') {
        heroIds = ["48866"]; // The 100
    } else {
        // Home and Movies sections share this pool
        heroIds = ["414906", "693134"]; // The Batman, Dune Part Two
    }

    const candidates = FALLBACK_DB.filter(m => heroIds.includes(m.id));
    
    // Safety check
    if (candidates.length === 0) {
         return FALLBACK_DB[0];
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
};