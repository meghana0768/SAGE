import type { MemoryGame, AttentionGame, LanguageGame, ProcessingSpeedGame, CategorySortingGame, PatternCompletionGame } from '@/types';

export const memoryGames: MemoryGame[] = [
  {
    id: 'memory-1',
    type: 'story',
    content: "Last Sunday, Margaret went to the farmer's market with her daughter Sarah. They bought fresh tomatoes, a loaf of sourdough bread, and some yellow sunflowers. On the way home, they stopped at the old bakery on Maple Street for Margaret's favorite lemon cookies.",
    questions: [
      { question: "What day did Margaret go to the market?", correctAnswer: "Sunday" },
      { question: "Who went with Margaret?", correctAnswer: "Sarah" },
      { question: "What kind of bread did they buy?", correctAnswer: "sourdough" },
      { question: "What street was the bakery on?", correctAnswer: "Maple Street" }
    ]
  },
  {
    id: 'memory-2',
    type: 'story',
    content: "Every morning, Robert takes his golden retriever named Buddy for a walk in the park near his house. They usually walk past the old oak tree and around the pond where the ducks live. Robert always brings a thermos of coffee and sits on his favorite green bench to watch the sunrise.",
    questions: [
      { question: "What is the dog's name?", correctAnswer: "Buddy" },
      { question: "What kind of tree do they walk past?", correctAnswer: "oak" },
      { question: "What does Robert bring with him?", correctAnswer: "coffee" },
      { question: "What color is his favorite bench?", correctAnswer: "green" }
    ]
  },
  {
    id: 'memory-3',
    type: 'story',
    content: "Helen celebrated her birthday last Tuesday at the Italian restaurant downtown. Her three grandchildren - Tommy, Emma, and little Jack - surprised her with a chocolate cake and a bouquet of pink roses. They gave her a beautiful silver photo frame with a picture from their beach vacation last summer.",
    questions: [
      { question: "When was Helen's birthday?", correctAnswer: "Tuesday" },
      { question: "What type of restaurant did they go to?", correctAnswer: "Italian" },
      { question: "What color were the roses?", correctAnswer: "pink" },
      { question: "Where was the photo from?", correctAnswer: "beach vacation" }
    ]
  },
  {
    id: 'memory-4',
    type: 'list',
    content: "Please listen carefully to this shopping list: milk, eggs, butter, apples, bread, cheese, orange juice, and chicken.",
    questions: [
      { question: "What fruit was on the list?", correctAnswer: "apples" },
      { question: "What dairy products were mentioned?", correctAnswer: "milk, butter, cheese" },
      { question: "What kind of juice was on the list?", correctAnswer: "orange juice" },
      { question: "What meat was mentioned?", correctAnswer: "chicken" }
    ]
  },
  {
    id: 'memory-5',
    type: 'story',
    content: "Dr. Patterson has been the family doctor for thirty years. His office is on the third floor of the red brick building on Center Avenue. He has a fish tank in the waiting room with colorful tropical fish. His nurse, Mrs. Chen, always remembers everyone's birthday.",
    questions: [
      { question: "How long has Dr. Patterson been the family doctor?", correctAnswer: "thirty years" },
      { question: "What floor is his office on?", correctAnswer: "third floor" },
      { question: "What's in the waiting room?", correctAnswer: "fish tank" },
      { question: "What is the nurse's name?", correctAnswer: "Mrs. Chen" }
    ]
  },
  {
    id: 'memory-6',
    type: 'story',
    content: "On Wednesday afternoon, Patricia visited her neighbor Mrs. Johnson who lives in the blue house next door. They sat in the garden and drank iced tea while watching the butterflies. Mrs. Johnson showed Patricia her new collection of vintage postcards from the 1950s.",
    questions: [
      { question: "What day did Patricia visit?", correctAnswer: "Wednesday" },
      { question: "What color is Mrs. Johnson's house?", correctAnswer: "blue" },
      { question: "What did they drink?", correctAnswer: "iced tea" },
      { question: "What did Mrs. Johnson show Patricia?", correctAnswer: "postcards" }
    ]
  },
  {
    id: 'memory-7',
    type: 'story',
    content: "George's favorite hobby is bird watching. Every Saturday morning, he goes to the nature reserve with his binoculars and notebook. Last week, he spotted a rare blue jay, two cardinals, and a family of robins building a nest in the tall pine tree.",
    questions: [
      { question: "What is George's hobby?", correctAnswer: "bird watching" },
      { question: "What day does he go?", correctAnswer: "Saturday" },
      { question: "What rare bird did he spot?", correctAnswer: "blue jay" },
      { question: "What kind of tree was the nest in?", correctAnswer: "pine" }
    ]
  },
  {
    id: 'memory-8',
    type: 'list',
    content: "The recipe calls for these ingredients: flour, sugar, eggs, vanilla extract, baking powder, salt, butter, and milk.",
    questions: [
      { question: "How many ingredients are in the recipe?", correctAnswer: "eight" },
      { question: "What flavoring is needed?", correctAnswer: "vanilla extract" },
      { question: "What leavening agent is used?", correctAnswer: "baking powder" },
      { question: "What dairy product is needed?", correctAnswer: "milk" }
    ]
  },
  {
    id: 'memory-9',
    type: 'story',
    content: "The community center hosts a knitting club every Thursday evening at seven o'clock. Last month, they made scarves for the local shelter. The group has fifteen members, and their teacher is a retired librarian named Ms. Thompson.",
    questions: [
      { question: "What day is the knitting club?", correctAnswer: "Thursday" },
      { question: "What time does it start?", correctAnswer: "seven o'clock" },
      { question: "How many members are there?", correctAnswer: "fifteen" },
      { question: "What is the teacher's name?", correctAnswer: "Ms. Thompson" }
    ]
  },
  {
    id: 'memory-10',
    type: 'story',
    content: "Frank's garden has three raised beds. In the first bed, he grows tomatoes and peppers. The second bed has lettuce and carrots. The third bed is for herbs like basil, rosemary, and thyme. He waters everything every morning at sunrise.",
    questions: [
      { question: "How many raised beds does Frank have?", correctAnswer: "three" },
      { question: "What grows in the first bed?", correctAnswer: "tomatoes and peppers" },
      { question: "What herbs does he grow?", correctAnswer: "basil, rosemary, thyme" },
      { question: "When does he water?", correctAnswer: "morning" }
    ]
  },
  {
    id: 'memory-11',
    type: 'story',
    content: "Eleanor loves reading mystery novels. Her favorite author is Agatha Christie, and she has collected over fifty books. She keeps them on a special shelf in her living room next to the window. Every Friday, she visits the library to find new stories.",
    questions: [
      { question: "What type of books does Eleanor like?", correctAnswer: "mystery" },
      { question: "Who is her favorite author?", correctAnswer: "Agatha Christie" },
      { question: "How many books has she collected?", correctAnswer: "fifty" },
      { question: "What day does she visit the library?", correctAnswer: "Friday" }
    ]
  },
  {
    id: 'memory-12',
    type: 'story',
    content: "The senior center organized a trip to the art museum last month. They took a bus that left at nine in the morning. The group saw paintings by Monet, Van Gogh, and Picasso. They had lunch at the museum café and returned home at three in the afternoon.",
    questions: [
      { question: "Where did they go?", correctAnswer: "art museum" },
      { question: "What time did the bus leave?", correctAnswer: "nine" },
      { question: "Which artists did they see?", correctAnswer: "Monet, Van Gogh, Picasso" },
      { question: "What time did they return?", correctAnswer: "three" }
    ]
  },
  {
    id: 'memory-13',
    type: 'list',
    content: "The packing list for the trip includes: a suitcase, passport, camera, sunscreen, hat, comfortable shoes, a map, and a travel guide.",
    questions: [
      { question: "What document is needed?", correctAnswer: "passport" },
      { question: "What protection from the sun?", correctAnswer: "sunscreen" },
      { question: "What type of shoes?", correctAnswer: "comfortable" },
      { question: "What helps with navigation?", correctAnswer: "map" }
    ]
  },
  {
    id: 'memory-14',
    type: 'story',
    content: "Martha's cat Whiskers is twelve years old. He's a gray tabby with white paws. Every evening at six, Whiskers sits by the front door waiting for his dinner. His favorite food is salmon-flavored cat food, and he drinks water from a blue ceramic bowl.",
    questions: [
      { question: "What is the cat's name?", correctAnswer: "Whiskers" },
      { question: "How old is the cat?", correctAnswer: "twelve" },
      { question: "What time does he wait for dinner?", correctAnswer: "six" },
      { question: "What color is his bowl?", correctAnswer: "blue" }
    ]
  },
  {
    id: 'memory-15',
    type: 'story',
    content: "The book club meets on the first Tuesday of every month at the coffee shop on Main Street. This month they discussed 'To Kill a Mockingbird' by Harper Lee. Next month's book is 'Pride and Prejudice' by Jane Austen. The group has twenty members.",
    questions: [
      { question: "When does the book club meet?", correctAnswer: "first Tuesday" },
      { question: "Where do they meet?", correctAnswer: "coffee shop" },
      { question: "What book did they discuss?", correctAnswer: "To Kill a Mockingbird" },
      { question: "How many members are there?", correctAnswer: "twenty" }
    ]
  },
  {
    id: 'memory-16',
    type: 'story',
    content: "James has been playing piano for forty years. He practices every day for one hour in his music room. His favorite composer is Beethoven, and he can play over thirty different pieces. He gives free lessons to neighborhood children every Saturday afternoon.",
    questions: [
      { question: "How long has James played piano?", correctAnswer: "forty years" },
      { question: "How long does he practice daily?", correctAnswer: "one hour" },
      { question: "Who is his favorite composer?", correctAnswer: "Beethoven" },
      { question: "When does he give lessons?", correctAnswer: "Saturday afternoon" }
    ]
  },
  {
    id: 'memory-17',
    type: 'list',
    content: "The medicine cabinet contains: aspirin, bandages, antiseptic, thermometer, cough syrup, and allergy medication.",
    questions: [
      { question: "What pain reliever is mentioned?", correctAnswer: "aspirin" },
      { question: "What is used for wounds?", correctAnswer: "bandages" },
      { question: "What measures temperature?", correctAnswer: "thermometer" },
      { question: "What treats allergies?", correctAnswer: "allergy medication" }
    ]
  },
  {
    id: 'memory-18',
    type: 'story',
    content: "The local theater group is putting on a play called 'Our Town' next Friday night. Tickets cost fifteen dollars for adults and ten dollars for seniors. The show starts at eight o'clock and runs for two hours. They've been rehearsing for six weeks.",
    questions: [
      { question: "What is the play called?", correctAnswer: "Our Town" },
      { question: "What day is the show?", correctAnswer: "Friday" },
      { question: "How much do senior tickets cost?", correctAnswer: "ten dollars" },
      { question: "How long have they been rehearsing?", correctAnswer: "six weeks" }
    ]
  },
  {
    id: 'memory-19',
    type: 'story',
    content: "Dorothy's favorite season is autumn. She loves the red and orange leaves, the crisp air, and pumpkin spice everything. Every October, she goes apple picking at the orchard with her grandchildren. They always make apple pie together when they get home.",
    questions: [
      { question: "What is Dorothy's favorite season?", correctAnswer: "autumn" },
      { question: "What colors does she like?", correctAnswer: "red and orange" },
      { question: "What month does she go apple picking?", correctAnswer: "October" },
      { question: "What do they make together?", correctAnswer: "apple pie" }
    ]
  },
  {
    id: 'memory-20',
    type: 'story',
    content: "The community garden has twenty plots. Each plot is ten feet by twelve feet. Members grow vegetables, flowers, and herbs. There's a tool shed with shovels, rakes, and watering cans. The garden coordinator is Mr. Rodriguez, who has been there for five years.",
    questions: [
      { question: "How many plots are in the garden?", correctAnswer: "twenty" },
      { question: "What size are the plots?", correctAnswer: "ten by twelve feet" },
      { question: "What tools are in the shed?", correctAnswer: "shovels, rakes, watering cans" },
      { question: "Who is the coordinator?", correctAnswer: "Mr. Rodriguez" }
    ]
  },
  {
    id: 'memory-21',
    type: 'story',
    content: "Betty's morning routine starts at six thirty. She makes coffee, reads the newspaper for thirty minutes, then takes a walk around the block. She always wears her red walking shoes and carries a small water bottle. After her walk, she has breakfast at eight o'clock.",
    questions: [
      { question: "What time does Betty's routine start?", correctAnswer: "six thirty" },
      { question: "How long does she read?", correctAnswer: "thirty minutes" },
      { question: "What color are her walking shoes?", correctAnswer: "red" },
      { question: "What time does she have breakfast?", correctAnswer: "eight" }
    ]
  },
  {
    id: 'memory-22',
    type: 'list',
    content: "The hardware store sells: hammers, nails, screws, paint, brushes, tape, glue, and light bulbs.",
    questions: [
      { question: "What tools are mentioned?", correctAnswer: "hammers" },
      { question: "What fasteners are sold?", correctAnswer: "nails, screws" },
      { question: "What painting supplies?", correctAnswer: "paint, brushes" },
      { question: "What adhesive is mentioned?", correctAnswer: "glue" }
    ]
  },
  {
    id: 'memory-23',
    type: 'story',
    content: "The library has a reading program for seniors every Wednesday at two in the afternoon. Last week, they read short stories by O. Henry. This week's topic is poetry by Robert Frost. The program is free and includes coffee and cookies. About thirty people usually attend.",
    questions: [
      { question: "What day is the reading program?", correctAnswer: "Wednesday" },
      { question: "What time does it start?", correctAnswer: "two" },
      { question: "Who wrote last week's stories?", correctAnswer: "O. Henry" },
      { question: "How many people attend?", correctAnswer: "thirty" }
    ]
  },
  {
    id: 'memory-24',
    type: 'story',
    content: "Harold collects stamps from around the world. He has over two thousand stamps in his collection. His favorites are from the 1960s, especially ones with space themes. He keeps them in special albums in his study. His most valuable stamp is from 1954.",
    questions: [
      { question: "What does Harold collect?", correctAnswer: "stamps" },
      { question: "How many stamps does he have?", correctAnswer: "two thousand" },
      { question: "What decade does he like?", correctAnswer: "1960s" },
      { question: "What year is his most valuable stamp from?", correctAnswer: "1954" }
    ]
  },
  {
    id: 'memory-25',
    type: 'story',
    content: "The neighborhood watch meeting is held on the second Monday of each month at the community center. Last month, they discussed installing new streetlights. The meeting starts at seven in the evening and usually lasts about one hour. The coordinator is Officer Martinez.",
    questions: [
      { question: "When is the meeting held?", correctAnswer: "second Monday" },
      { question: "Where do they meet?", correctAnswer: "community center" },
      { question: "What did they discuss last month?", correctAnswer: "streetlights" },
      { question: "Who is the coordinator?", correctAnswer: "Officer Martinez" }
    ]
  },
  {
    id: 'memory-26',
    type: 'list',
    content: "The breakfast menu includes: scrambled eggs, bacon, toast, orange juice, coffee, oatmeal, and fresh fruit.",
    questions: [
      { question: "What type of eggs?", correctAnswer: "scrambled" },
      { question: "What meat is served?", correctAnswer: "bacon" },
      { question: "What drink is mentioned?", correctAnswer: "orange juice" },
      { question: "What grain dish?", correctAnswer: "oatmeal" }
    ]
  },
  {
    id: 'memory-27',
    type: 'story',
    content: "Ruth volunteers at the animal shelter every Tuesday and Thursday. She helps feed the dogs and cats, cleans their cages, and walks the dogs. Her favorite dog is a golden retriever named Max who is three years old. She's been volunteering for two years.",
    questions: [
      { question: "Where does Ruth volunteer?", correctAnswer: "animal shelter" },
      { question: "What days does she volunteer?", correctAnswer: "Tuesday and Thursday" },
      { question: "What is the dog's name?", correctAnswer: "Max" },
      { question: "How long has she been volunteering?", correctAnswer: "two years" }
    ]
  },
  {
    id: 'memory-28',
    type: 'story',
    content: "The local bakery makes fresh bread every morning starting at four o'clock. They bake sourdough, whole wheat, rye, and French bread. The bakery opens at six thirty and closes at six in the evening. The owner, Mrs. Williams, has run the bakery for twenty-five years.",
    questions: [
      { question: "What time do they start baking?", correctAnswer: "four" },
      { question: "What types of bread do they make?", correctAnswer: "sourdough, whole wheat, rye, French" },
      { question: "What time does the bakery open?", correctAnswer: "six thirty" },
      { question: "How long has Mrs. Williams run it?", correctAnswer: "twenty-five years" }
    ]
  },
  {
    id: 'memory-29',
    type: 'list',
    content: "The exercise routine includes: stretching, walking, arm circles, leg lifts, and deep breathing.",
    questions: [
      { question: "What warm-up activity?", correctAnswer: "stretching" },
      { question: "What cardio exercise?", correctAnswer: "walking" },
      { question: "What arm exercise?", correctAnswer: "arm circles" },
      { question: "What leg exercise?", correctAnswer: "leg lifts" }
    ]
  },
  {
    id: 'memory-30',
    type: 'story',
    content: "The senior center offers computer classes every Monday morning at ten o'clock. The class teaches email, internet browsing, and video calls. The instructor is a retired teacher named Mr. Anderson. The class has twelve students and meets for eight weeks.",
    questions: [
      { question: "What day is the computer class?", correctAnswer: "Monday" },
      { question: "What time does it start?", correctAnswer: "ten" },
      { question: "What does the class teach?", correctAnswer: "email, internet, video calls" },
      { question: "How many students are there?", correctAnswer: "twelve" }
    ]
  },
  {
    id: 'memory-31',
    type: 'story',
    content: "The family reunion is held every year on the first Saturday in July at the park. This year, fifty relatives attended. They had a potluck lunch with fried chicken, potato salad, and apple pie. The children played games while the adults caught up on family news.",
    questions: [
      { question: "When is the reunion held?", correctAnswer: "first Saturday in July" },
      { question: "Where is it held?", correctAnswer: "park" },
      { question: "How many people attended?", correctAnswer: "fifty" },
      { question: "What food was served?", correctAnswer: "fried chicken, potato salad, apple pie" }
    ]
  },
  {
    id: 'memory-32',
    type: 'story',
    content: "The antique shop on Elm Street has been there for forty years. It's owned by a couple named the Millers. They specialize in vintage furniture, old clocks, and collectible dishes. The shop is open Tuesday through Saturday from ten to five. They have over five hundred items.",
    questions: [
      { question: "What street is the shop on?", correctAnswer: "Elm Street" },
      { question: "How long has it been there?", correctAnswer: "forty years" },
      { question: "Who owns it?", correctAnswer: "Millers" },
      { question: "What days is it open?", correctAnswer: "Tuesday through Saturday" }
    ]
  },
  {
    id: 'memory-33',
    type: 'list',
    content: "The cleaning supplies needed are: soap, sponges, paper towels, window cleaner, floor polish, and trash bags.",
    questions: [
      { question: "What basic cleaning item?", correctAnswer: "soap" },
      { question: "What for scrubbing?", correctAnswer: "sponges" },
      { question: "What for windows?", correctAnswer: "window cleaner" },
      { question: "What for floors?", correctAnswer: "floor polish" }
    ]
  },
  {
    id: 'memory-34',
    type: 'story',
    content: "The knitting circle meets every Friday afternoon at two o'clock in the church basement. They're currently making blankets for the homeless shelter. Each blanket takes about three weeks to complete. The group has eight members, all over the age of sixty.",
    questions: [
      { question: "What day does the knitting circle meet?", correctAnswer: "Friday" },
      { question: "Where do they meet?", correctAnswer: "church basement" },
      { question: "What are they making?", correctAnswer: "blankets" },
      { question: "How long does each blanket take?", correctAnswer: "three weeks" }
    ]
  },
  {
    id: 'memory-35',
    type: 'story',
    content: "The local newspaper publishes a senior section every Thursday. It includes articles about health, recipes, and local events. The editor is Mrs. Peterson, who has worked there for fifteen years. Readers can submit their own stories and photos.",
    questions: [
      { question: "What day is the senior section published?", correctAnswer: "Thursday" },
      { question: "What topics are included?", correctAnswer: "health, recipes, events" },
      { question: "Who is the editor?", correctAnswer: "Mrs. Peterson" },
      { question: "How long has she worked there?", correctAnswer: "fifteen years" }
    ]
  },
  {
    id: 'memory-36',
    type: 'story',
    content: "The community pool opens on Memorial Day and closes on Labor Day. It's open from nine in the morning until eight at night. Senior swim time is every weekday from ten to eleven. The pool has a lifeguard named Jake who is certified in first aid.",
    questions: [
      { question: "When does the pool open?", correctAnswer: "Memorial Day" },
      { question: "What time does it open?", correctAnswer: "nine" },
      { question: "When is senior swim time?", correctAnswer: "weekdays ten to eleven" },
      { question: "What is the lifeguard's name?", correctAnswer: "Jake" }
    ]
  },
  {
    id: 'memory-37',
    type: 'list',
    content: "The toolbox contains: a screwdriver, wrench, pliers, hammer, measuring tape, and a level.",
    questions: [
      { question: "What tool for screws?", correctAnswer: "screwdriver" },
      { question: "What for measuring?", correctAnswer: "measuring tape" },
      { question: "What for gripping?", correctAnswer: "pliers" },
      { question: "What for leveling?", correctAnswer: "level" }
    ]
  },
  {
    id: 'memory-38',
    type: 'story',
    content: "The bridge club meets every Wednesday evening at seven o'clock at the community center. They play for three hours and have refreshments during a break. The club has been running for thirty years and has twenty-four members. They play in groups of four.",
    questions: [
      { question: "What day is bridge club?", correctAnswer: "Wednesday" },
      { question: "What time does it start?", correctAnswer: "seven" },
      { question: "How long do they play?", correctAnswer: "three hours" },
      { question: "How many members are there?", correctAnswer: "twenty-four" }
    ]
  },
  {
    id: 'memory-39',
    type: 'story',
    content: "The local diner serves breakfast all day. Their most popular dish is the blueberry pancakes with maple syrup. They also make excellent omelets with three eggs, cheese, and your choice of vegetables. The diner has been family-owned for three generations.",
    questions: [
      { question: "What do they serve all day?", correctAnswer: "breakfast" },
      { question: "What is their most popular dish?", correctAnswer: "blueberry pancakes" },
      { question: "How many eggs in the omelet?", correctAnswer: "three" },
      { question: "How long has it been family-owned?", correctAnswer: "three generations" }
    ]
  },
  {
    id: 'memory-40',
    type: 'story',
    content: "The walking group meets every morning at seven thirty at the park entrance. They walk for forty-five minutes along the nature trail. The group has been walking together for five years. There are usually about fifteen people, and they always end with stretching exercises.",
    questions: [
      { question: "What time does the walking group meet?", correctAnswer: "seven thirty" },
      { question: "Where do they meet?", correctAnswer: "park entrance" },
      { question: "How long do they walk?", correctAnswer: "forty-five minutes" },
      { question: "How many people usually attend?", correctAnswer: "fifteen" }
    ]
  },
  {
    id: 'memory-41',
    type: 'list',
    content: "The first aid kit should have: bandages, antiseptic wipes, gauze, medical tape, scissors, and pain relievers.",
    questions: [
      { question: "What for cleaning wounds?", correctAnswer: "antiseptic wipes" },
      { question: "What for covering wounds?", correctAnswer: "gauze" },
      { question: "What tool is needed?", correctAnswer: "scissors" },
      { question: "What for pain?", correctAnswer: "pain relievers" }
    ]
  },
  {
    id: 'memory-42',
    type: 'story',
    content: "The quilting bee meets on the first and third Saturday of each month. They meet at the senior center from one to four in the afternoon. Currently, they're working on a quilt for the community raffle. The group has ten members, and each person works on a different square.",
    questions: [
      { question: "When does the quilting bee meet?", correctAnswer: "first and third Saturday" },
      { question: "Where do they meet?", correctAnswer: "senior center" },
      { question: "What time do they meet?", correctAnswer: "one to four" },
      { question: "How many members are there?", correctAnswer: "ten" }
    ]
  },
  {
    id: 'memory-43',
    type: 'story',
    content: "The local history museum has a special exhibit about the town's founding in 1875. The exhibit includes old photographs, documents, and artifacts from that era. Admission is free for seniors on Tuesdays. The museum is open from ten to four, Tuesday through Sunday.",
    questions: [
      { question: "When was the town founded?", correctAnswer: "1875" },
      { question: "What does the exhibit include?", correctAnswer: "photographs, documents, artifacts" },
      { question: "When is admission free for seniors?", correctAnswer: "Tuesdays" },
      { question: "What are the hours?", correctAnswer: "ten to four" }
    ]
  },
  {
    id: 'memory-44',
    type: 'list',
    content: "The picnic basket should contain: sandwiches, fruit, cookies, napkins, plates, cups, and a blanket.",
    questions: [
      { question: "What food item?", correctAnswer: "sandwiches" },
      { question: "What dessert?", correctAnswer: "cookies" },
      { question: "What for serving?", correctAnswer: "plates, cups" },
      { question: "What to sit on?", correctAnswer: "blanket" }
    ]
  },
  {
    id: 'memory-45',
    type: 'story',
    content: "The chess club meets every Tuesday evening at the library. Games start at six thirty and usually last about an hour. The club has eighteen members of all skill levels. They have a tournament once a month, and the winner gets a small trophy.",
    questions: [
      { question: "What day is chess club?", correctAnswer: "Tuesday" },
      { question: "Where do they meet?", correctAnswer: "library" },
      { question: "What time do games start?", correctAnswer: "six thirty" },
      { question: "How many members are there?", correctAnswer: "eighteen" }
    ]
  },
  {
    id: 'memory-46',
    type: 'story',
    content: "The flower shop on Main Street has been there for sixty years. They specialize in roses, tulips, and daisies. The owner, Mrs. Green, arranges custom bouquets. The shop is open Monday through Saturday from eight to six. They deliver within a five-mile radius.",
    questions: [
      { question: "How long has the shop been there?", correctAnswer: "sixty years" },
      { question: "What flowers do they specialize in?", correctAnswer: "roses, tulips, daisies" },
      { question: "Who is the owner?", correctAnswer: "Mrs. Green" },
      { question: "What are their delivery radius?", correctAnswer: "five miles" }
    ]
  },
  {
    id: 'memory-47',
    type: 'list',
    content: "The laundry basket has: white shirts, blue jeans, towels, socks, and a red sweater.",
    questions: [
      { question: "What color shirts?", correctAnswer: "white" },
      { question: "What type of pants?", correctAnswer: "blue jeans" },
      { question: "What clothing item?", correctAnswer: "socks" },
      { question: "What color sweater?", correctAnswer: "red" }
    ]
  },
  {
    id: 'memory-48',
    type: 'story',
    content: "The senior center offers yoga classes every Monday, Wednesday, and Friday at nine in the morning. The classes are gentle and suitable for all fitness levels. The instructor is a certified yoga teacher named Ms. Davis. Each class lasts for one hour.",
    questions: [
      { question: "What days are yoga classes?", correctAnswer: "Monday, Wednesday, Friday" },
      { question: "What time are the classes?", correctAnswer: "nine" },
      { question: "Who is the instructor?", correctAnswer: "Ms. Davis" },
      { question: "How long is each class?", correctAnswer: "one hour" }
    ]
  },
  {
    id: 'memory-49',
    type: 'story',
    content: "The local theater shows classic movies every Friday night at seven thirty. Tickets cost eight dollars for seniors. Last week they showed 'Casablanca' from 1942. This week's movie is 'The Sound of Music' from 1965. The theater has comfortable seats and serves popcorn.",
    questions: [
      { question: "What day are movies shown?", correctAnswer: "Friday" },
      { question: "How much do senior tickets cost?", correctAnswer: "eight dollars" },
      { question: "What movie was shown last week?", correctAnswer: "Casablanca" },
      { question: "What year was it from?", correctAnswer: "1942" }
    ]
  },
  {
    id: 'memory-50',
    type: 'story',
    content: "The community garden has a harvest festival every September. This year, they grew tomatoes, corn, beans, and pumpkins. The festival includes a pie contest, live music, and a farmers market. Over two hundred people attended last year's festival.",
    questions: [
      { question: "When is the harvest festival?", correctAnswer: "September" },
      { question: "What vegetables did they grow?", correctAnswer: "tomatoes, corn, beans, pumpkins" },
      { question: "What activities are included?", correctAnswer: "pie contest, music, farmers market" },
      { question: "How many people attended last year?", correctAnswer: "two hundred" }
    ]
  },
  {
    id: 'memory-51',
    type: 'list',
    content: "The office supplies needed are: pens, pencils, paper, stapler, paper clips, and folders.",
    questions: [
      { question: "What writing tools?", correctAnswer: "pens, pencils" },
      { question: "What for fastening?", correctAnswer: "stapler, paper clips" },
      { question: "What for organizing?", correctAnswer: "folders" },
      { question: "What basic supply?", correctAnswer: "paper" }
    ]
  },
  {
    id: 'memory-52',
    type: 'story',
    content: "The local choir practices every Thursday evening at the church. They have thirty members and sing a mix of traditional hymns and modern songs. Their next concert is in two weeks at the community center. The choir director is Mr. Johnson, who has led them for ten years.",
    questions: [
      { question: "What day does the choir practice?", correctAnswer: "Thursday" },
      { question: "Where do they practice?", correctAnswer: "church" },
      { question: "How many members are there?", correctAnswer: "thirty" },
      { question: "Who is the director?", correctAnswer: "Mr. Johnson" }
    ]
  },
  {
    id: 'memory-53',
    type: 'story',
    content: "The neighborhood has a block party every year on the last Saturday in August. They close off the street and set up tables and chairs. Everyone brings a dish to share. There's music, games for the children, and a raffle. Last year, over one hundred people came.",
    questions: [
      { question: "When is the block party?", correctAnswer: "last Saturday in August" },
      { question: "What do they do with the street?", correctAnswer: "close it off" },
      { question: "What do people bring?", correctAnswer: "a dish" },
      { question: "How many people came last year?", correctAnswer: "one hundred" }
    ]
  },
  {
    id: 'memory-54',
    type: 'list',
    content: "The spice rack contains: salt, pepper, garlic powder, oregano, basil, cinnamon, and paprika.",
    questions: [
      { question: "What basic seasonings?", correctAnswer: "salt, pepper" },
      { question: "What Italian herbs?", correctAnswer: "oregano, basil" },
      { question: "What sweet spice?", correctAnswer: "cinnamon" },
      { question: "What red spice?", correctAnswer: "paprika" }
    ]
  },
  {
    id: 'memory-55',
    type: 'story',
    content: "The local pharmacy has been serving the community for seventy-five years. It's located on Oak Avenue next to the post office. They offer prescription services, health consultations, and free blood pressure checks every Tuesday. The pharmacist, Mr. Lee, has worked there for twenty years.",
    questions: [
      { question: "How long has the pharmacy been there?", correctAnswer: "seventy-five years" },
      { question: "What street is it on?", correctAnswer: "Oak Avenue" },
      { question: "What day do they do free checks?", correctAnswer: "Tuesday" },
      { question: "How long has Mr. Lee worked there?", correctAnswer: "twenty years" }
    ]
  },
  {
    id: 'memory-56',
    type: 'story',
    content: "The senior center has a game room with pool tables, card tables, and board games. It's open every day from eight in the morning until eight at night. The most popular game is bingo, which is played every Friday afternoon. About forty people usually play.",
    questions: [
      { question: "What games are available?", correctAnswer: "pool, cards, board games" },
      { question: "What time does it open?", correctAnswer: "eight" },
      { question: "What is the most popular game?", correctAnswer: "bingo" },
      { question: "How many people usually play?", correctAnswer: "forty" }
    ]
  },
  {
    id: 'memory-57',
    type: 'list',
    content: "The fruit bowl has: apples, bananas, oranges, grapes, and a pear.",
    questions: [
      { question: "How many types of fruit?", correctAnswer: "five" },
      { question: "What yellow fruit?", correctAnswer: "bananas" },
      { question: "What small fruit?", correctAnswer: "grapes" },
      { question: "What green fruit?", correctAnswer: "pear" }
    ]
  },
  {
    id: 'memory-58',
    type: 'story',
    content: "The local radio station has a senior request hour every weekday at eleven in the morning. Listeners can call in to request their favorite songs from the 1950s and 1960s. The host is DJ Mike, who has been doing the show for five years. The station plays classic rock, jazz, and big band music.",
    questions: [
      { question: "When is the request hour?", correctAnswer: "weekdays at eleven" },
      { question: "What decades of music?", correctAnswer: "1950s and 1960s" },
      { question: "Who is the host?", correctAnswer: "DJ Mike" },
      { question: "What types of music?", correctAnswer: "rock, jazz, big band" }
    ]
  },
  {
    id: 'memory-59',
    type: 'story',
    content: "The community center offers free tax preparation help every February and March. Volunteers from the local accounting firm help seniors file their taxes. Appointments are available Monday through Friday from nine to three. Last year, they helped over one hundred people.",
    questions: [
      { question: "When is tax help available?", correctAnswer: "February and March" },
      { question: "Who provides the help?", correctAnswer: "volunteers from accounting firm" },
      { question: "What days are appointments?", correctAnswer: "Monday through Friday" },
      { question: "How many people did they help last year?", correctAnswer: "one hundred" }
    ]
  },
  {
    id: 'memory-60',
    type: 'story',
    content: "The local park has a walking trail that's two miles long. It goes around a small lake and through a wooded area. The trail is paved and wheelchair accessible. There are benches every quarter mile for resting. The park opens at sunrise and closes at sunset.",
    questions: [
      { question: "How long is the trail?", correctAnswer: "two miles" },
      { question: "What does it go around?", correctAnswer: "lake" },
      { question: "How often are benches placed?", correctAnswer: "every quarter mile" },
      { question: "When does the park open?", correctAnswer: "sunrise" }
    ]
  },
  {
    id: 'memory-61',
    type: 'list',
    content: "The winter clothing includes: a heavy coat, gloves, a scarf, boots, and a warm hat.",
    questions: [
      { question: "What outerwear?", correctAnswer: "coat" },
      { question: "What for hands?", correctAnswer: "gloves" },
      { question: "What for feet?", correctAnswer: "boots" },
      { question: "What for head?", correctAnswer: "hat" }
    ]
  },
  {
    id: 'memory-62',
    type: 'story',
    content: "The local diner has a senior discount of fifteen percent every day. Their breakfast special includes two eggs, toast, hash browns, and coffee for six dollars. The diner is open from six in the morning until ten at night. They've been in business for fifty years.",
    questions: [
      { question: "What is the senior discount?", correctAnswer: "fifteen percent" },
      { question: "What does the breakfast special include?", correctAnswer: "eggs, toast, hash browns, coffee" },
      { question: "How much does it cost?", correctAnswer: "six dollars" },
      { question: "How long have they been in business?", correctAnswer: "fifty years" }
    ]
  },
  {
    id: 'memory-63',
    type: 'story',
    content: "The community library has a book sale every first Saturday of the month. Books cost one dollar for paperbacks and two dollars for hardcovers. All proceeds go to buying new books for the children's section. Last month, they raised three hundred dollars.",
    questions: [
      { question: "When is the book sale?", correctAnswer: "first Saturday" },
      { question: "How much are paperbacks?", correctAnswer: "one dollar" },
      { question: "Where do proceeds go?", correctAnswer: "children's section" },
      { question: "How much did they raise last month?", correctAnswer: "three hundred dollars" }
    ]
  },
  {
    id: 'memory-64',
    type: 'list',
    content: "The bathroom cabinet has: toothpaste, toothbrush, floss, mouthwash, and dental picks.",
    questions: [
      { question: "What for cleaning teeth?", correctAnswer: "toothpaste, toothbrush" },
      { question: "What for between teeth?", correctAnswer: "floss" },
      { question: "What for rinsing?", correctAnswer: "mouthwash" },
      { question: "What additional tool?", correctAnswer: "dental picks" }
    ]
  },
  {
    id: 'memory-65',
    type: 'story',
    content: "The senior center has a craft fair every November. Local artisans sell handmade items like quilts, pottery, jewelry, and wood carvings. The fair runs for two days, Friday and Saturday, from ten to five. Admission is free, and there's a raffle with prizes.",
    questions: [
      { question: "When is the craft fair?", correctAnswer: "November" },
      { question: "What items are sold?", correctAnswer: "quilts, pottery, jewelry, wood carvings" },
      { question: "How long does it run?", correctAnswer: "two days" },
      { question: "What is the admission cost?", correctAnswer: "free" }
    ]
  },
  {
    id: 'memory-66',
    type: 'story',
    content: "The local post office is open Monday through Friday from eight to five, and Saturday from nine to one. They offer passport services, package shipping, and post office boxes. The postmaster, Mrs. Brown, has worked there for thirty years. They process about five hundred pieces of mail daily.",
    questions: [
      { question: "What are the weekday hours?", correctAnswer: "eight to five" },
      { question: "What services do they offer?", correctAnswer: "passports, shipping, boxes" },
      { question: "Who is the postmaster?", correctAnswer: "Mrs. Brown" },
      { question: "How much mail do they process daily?", correctAnswer: "five hundred" }
    ]
  },
  {
    id: 'memory-67',
    type: 'list',
    content: "The pet supplies include: dog food, cat food, a leash, a collar, toys, and a water bowl.",
    questions: [
      { question: "What for dogs?", correctAnswer: "dog food, leash, collar" },
      { question: "What for cats?", correctAnswer: "cat food" },
      { question: "What for play?", correctAnswer: "toys" },
      { question: "What for drinking?", correctAnswer: "water bowl" }
    ]
  },
  {
    id: 'memory-68',
    type: 'story',
    content: "The community center hosts a monthly potluck dinner on the third Friday of each month. Everyone brings a dish to share. Last month, there were twenty-five people and they had lasagna, salad, bread, and apple pie. The dinner starts at six and usually lasts until eight.",
    questions: [
      { question: "When is the potluck?", correctAnswer: "third Friday" },
      { question: "What do people bring?", correctAnswer: "a dish" },
      { question: "How many people attended last month?", correctAnswer: "twenty-five" },
      { question: "What time does it start?", correctAnswer: "six" }
    ]
  },
  {
    id: 'memory-69',
    type: 'story',
    content: "The local hardware store has a senior discount day every Tuesday. Seniors get ten percent off all purchases. The store sells tools, paint, garden supplies, and home improvement items. The owner, Mr. Smith, has been running the store for forty years.",
    questions: [
      { question: "What day is senior discount day?", correctAnswer: "Tuesday" },
      { question: "What is the discount?", correctAnswer: "ten percent" },
      { question: "What does the store sell?", correctAnswer: "tools, paint, garden supplies" },
      { question: "How long has Mr. Smith run it?", correctAnswer: "forty years" }
    ]
  },
  {
    id: 'memory-70',
    type: 'story',
    content: "The senior center has a travel club that organizes trips every month. Last month, they went to the mountains for a weekend. This month, they're planning a day trip to the coast. The club has thirty members, and trips are open to all seniors. The coordinator is Mrs. Taylor.",
    questions: [
      { question: "How often does the travel club organize trips?", correctAnswer: "every month" },
      { question: "Where did they go last month?", correctAnswer: "mountains" },
      { question: "Where are they going this month?", correctAnswer: "coast" },
      { question: "Who is the coordinator?", correctAnswer: "Mrs. Taylor" }
    ]
  },
  {
    id: 'memory-71',
    type: 'list',
    content: "The kitchen drawer has: forks, knives, spoons, measuring cups, a can opener, and a bottle opener.",
    questions: [
      { question: "What eating utensils?", correctAnswer: "forks, knives, spoons" },
      { question: "What for measuring?", correctAnswer: "measuring cups" },
      { question: "What for opening cans?", correctAnswer: "can opener" },
      { question: "What for opening bottles?", correctAnswer: "bottle opener" }
    ]
  },
  {
    id: 'memory-72',
    type: 'story',
    content: "The local church has a soup kitchen that serves lunch every Tuesday and Thursday from noon to two. They serve soup, sandwiches, and dessert to anyone in need. The kitchen is run by volunteers and has been operating for twenty years. They serve about fifty people each day.",
    questions: [
      { question: "What days does the soup kitchen operate?", correctAnswer: "Tuesday and Thursday" },
      { question: "What time do they serve?", correctAnswer: "noon to two" },
      { question: "What do they serve?", correctAnswer: "soup, sandwiches, dessert" },
      { question: "How many people do they serve daily?", correctAnswer: "fifty" }
    ]
  },
  {
    id: 'memory-73',
    type: 'story',
    content: "The community garden has a seed exchange program every spring. Gardeners can trade seeds and get advice from experienced growers. The exchange is held at the community center on the first Saturday in April. Last year, over sixty people participated.",
    questions: [
      { question: "When is the seed exchange?", correctAnswer: "spring" },
      { question: "What can gardeners do?", correctAnswer: "trade seeds, get advice" },
      { question: "When is it held?", correctAnswer: "first Saturday in April" },
      { question: "How many people participated last year?", correctAnswer: "sixty" }
    ]
  },
  {
    id: 'memory-74',
    type: 'list',
    content: "The medicine cabinet has: prescription bottles, vitamins, bandages, thermometer, and cough drops.",
    questions: [
      { question: "What medications?", correctAnswer: "prescription bottles" },
      { question: "What supplements?", correctAnswer: "vitamins" },
      { question: "What for wounds?", correctAnswer: "bandages" },
      { question: "What for sore throat?", correctAnswer: "cough drops" }
    ]
  },
  {
    id: 'memory-75',
    type: 'story',
    content: "The local museum has free admission for seniors every Wednesday. They have exhibits on local history, art, and science. The museum is open from ten to five, Tuesday through Sunday. They offer guided tours at two o'clock every afternoon. The museum has been there for ninety years.",
    questions: [
      { question: "When is admission free for seniors?", correctAnswer: "Wednesday" },
      { question: "What types of exhibits?", correctAnswer: "history, art, science" },
      { question: "What time are guided tours?", correctAnswer: "two" },
      { question: "How long has the museum been there?", correctAnswer: "ninety years" }
    ]
  },
  {
    id: 'memory-76',
    type: 'story',
    content: "The senior center has a computer lab with twelve computers. They offer classes on email, internet, and video calls. The lab is open Monday through Friday from nine to four. A volunteer named Tom helps seniors with computer questions. The lab has been there for eight years.",
    questions: [
      { question: "How many computers are in the lab?", correctAnswer: "twelve" },
      { question: "What do they teach?", correctAnswer: "email, internet, video calls" },
      { question: "What are the hours?", correctAnswer: "nine to four" },
      { question: "Who helps with questions?", correctAnswer: "Tom" }
    ]
  },
  {
    id: 'memory-77',
    type: 'list',
    content: "The grocery list includes: bread, milk, eggs, chicken, rice, vegetables, and fruit.",
    questions: [
      { question: "What dairy product?", correctAnswer: "milk" },
      { question: "What protein?", correctAnswer: "chicken" },
      { question: "What grain?", correctAnswer: "rice" },
      { question: "What produce?", correctAnswer: "vegetables, fruit" }
    ]
  },
  {
    id: 'memory-78',
    type: 'story',
    content: "The local park has a bandstand where concerts are held every Sunday afternoon in the summer. The concerts are free and start at three o'clock. They feature local musicians playing jazz, classical, and folk music. The concerts run from June through August. About one hundred people usually attend.",
    questions: [
      { question: "When are concerts held?", correctAnswer: "Sunday afternoon in summer" },
      { question: "What time do they start?", correctAnswer: "three" },
      { question: "What types of music?", correctAnswer: "jazz, classical, folk" },
      { question: "How many people usually attend?", correctAnswer: "one hundred" }
    ]
  },
  {
    id: 'memory-79',
    type: 'story',
    content: "The senior center has a library with over one thousand books. They have fiction, non-fiction, large print books, and audiobooks. The library is open every day from eight to six. Volunteers help organize the books and assist with finding materials. New books are added every month.",
    questions: [
      { question: "How many books are in the library?", correctAnswer: "one thousand" },
      { question: "What types of books?", correctAnswer: "fiction, non-fiction, large print, audiobooks" },
      { question: "What are the hours?", correctAnswer: "eight to six" },
      { question: "How often are new books added?", correctAnswer: "every month" }
    ]
  },
  {
    id: 'memory-80',
    type: 'story',
    content: "The community center has a fitness room with treadmills, exercise bikes, and weight machines. It's open every day from six in the morning until nine at night. Seniors can use it for free. There's a fitness instructor available on Monday, Wednesday, and Friday mornings.",
    questions: [
      { question: "What equipment is in the fitness room?", correctAnswer: "treadmills, bikes, weights" },
      { question: "What time does it open?", correctAnswer: "six" },
      { question: "What is the cost for seniors?", correctAnswer: "free" },
      { question: "When is the instructor available?", correctAnswer: "Monday, Wednesday, Friday mornings" }
    ]
  },
  {
    id: 'memory-81',
    type: 'list',
    content: "The tool box has: a hammer, nails, screws, a drill, a saw, and sandpaper.",
    questions: [
      { question: "What for hitting?", correctAnswer: "hammer" },
      { question: "What fasteners?", correctAnswer: "nails, screws" },
      { question: "What power tool?", correctAnswer: "drill" },
      { question: "What for smoothing?", correctAnswer: "sandpaper" }
    ]
  },
  {
    id: 'memory-82',
    type: 'story',
    content: "The local grocery store has a senior discount of five percent every Wednesday. They also have a pharmacy, a bakery, and a deli counter. The store is open from seven in the morning until ten at night, seven days a week. They've been serving the community for forty years.",
    questions: [
      { question: "What day is senior discount day?", correctAnswer: "Wednesday" },
      { question: "What is the discount?", correctAnswer: "five percent" },
      { question: "What departments do they have?", correctAnswer: "pharmacy, bakery, deli" },
      { question: "How long have they been in business?", correctAnswer: "forty years" }
    ]
  },
  {
    id: 'memory-83',
    type: 'story',
    content: "The senior center has a woodworking shop with tools and materials. Classes are offered every Tuesday and Thursday afternoon. Students learn to make small projects like birdhouses and picture frames. The instructor is a retired carpenter named Mr. Wilson. The class has eight students.",
    questions: [
      { question: "What is available at the senior center?", correctAnswer: "woodworking shop" },
      { question: "When are classes?", correctAnswer: "Tuesday and Thursday afternoon" },
      { question: "What do students make?", correctAnswer: "birdhouses, picture frames" },
      { question: "Who is the instructor?", correctAnswer: "Mr. Wilson" }
    ]
  },
  {
    id: 'memory-84',
    type: 'list',
    content: "The craft supplies include: yarn, fabric, scissors, thread, buttons, and a sewing needle.",
    questions: [
      { question: "What for knitting?", correctAnswer: "yarn" },
      { question: "What for sewing?", correctAnswer: "fabric, thread, needle" },
      { question: "What tool?", correctAnswer: "scissors" },
      { question: "What fasteners?", correctAnswer: "buttons" }
    ]
  },
  {
    id: 'memory-85',
    type: 'story',
    content: "The local theater group puts on four plays each year. They perform at the community center theater which seats two hundred people. Tickets cost twelve dollars for adults and eight dollars for seniors. Their next play is 'A Christmas Carol' in December. The group has been performing for thirty years.",
    questions: [
      { question: "How many plays do they put on each year?", correctAnswer: "four" },
      { question: "How many seats in the theater?", correctAnswer: "two hundred" },
      { question: "How much are senior tickets?", correctAnswer: "eight dollars" },
      { question: "What is their next play?", correctAnswer: "A Christmas Carol" }
    ]
  },
  {
    id: 'memory-86',
    type: 'story',
    content: "The community center has a photography club that meets every second Saturday of the month. Members share their photos and learn new techniques. The club has twenty members and they organize photo walks in different locations. The leader is a professional photographer named Ms. Park.",
    questions: [
      { question: "When does the photography club meet?", correctAnswer: "second Saturday" },
      { question: "What do members do?", correctAnswer: "share photos, learn techniques" },
      { question: "How many members are there?", correctAnswer: "twenty" },
      { question: "Who is the leader?", correctAnswer: "Ms. Park" }
    ]
  },
  {
    id: 'memory-87',
    type: 'list',
    content: "The picnic supplies include: a cooler, ice, sandwiches, fruit, drinks, and a tablecloth.",
    questions: [
      { question: "What for keeping things cold?", correctAnswer: "cooler, ice" },
      { question: "What food?", correctAnswer: "sandwiches, fruit" },
      { question: "What beverages?", correctAnswer: "drinks" },
      { question: "What for the table?", correctAnswer: "tablecloth" }
    ]
  },
  {
    id: 'memory-88',
    type: 'story',
    content: "The local senior center has a dance class every Friday evening at seven. They teach ballroom dancing including waltz, foxtrot, and swing. The class is for all skill levels and costs five dollars per session. The instructor is a professional dancer named Mrs. Martinez. About fifteen couples usually attend.",
    questions: [
      { question: "What day is dance class?", correctAnswer: "Friday" },
      { question: "What time does it start?", correctAnswer: "seven" },
      { question: "What dances do they teach?", correctAnswer: "waltz, foxtrot, swing" },
      { question: "How much does it cost?", correctAnswer: "five dollars" }
    ]
  },
  {
    id: 'memory-89',
    type: 'story',
    content: "The community garden has a greenhouse where members can start seeds early in the season. The greenhouse is heated and has automatic watering. It's open to all garden members from March through October. Members can reserve space for their seedlings. The greenhouse coordinator is Mr. Davis.",
    questions: [
      { question: "What does the garden have?", correctAnswer: "greenhouse" },
      { question: "What does it have?", correctAnswer: "heating, automatic watering" },
      { question: "When is it open?", correctAnswer: "March through October" },
      { question: "Who is the coordinator?", correctAnswer: "Mr. Davis" }
    ]
  },
  {
    id: 'memory-90',
    type: 'list',
    content: "The camping gear includes: a tent, sleeping bag, flashlight, matches, a first aid kit, and a water bottle.",
    questions: [
      { question: "What for shelter?", correctAnswer: "tent" },
      { question: "What for sleeping?", correctAnswer: "sleeping bag" },
      { question: "What for light?", correctAnswer: "flashlight" },
      { question: "What for fire?", correctAnswer: "matches" }
    ]
  },
  {
    id: 'memory-91',
    type: 'story',
    content: "The local library has a book discussion group that meets on the last Tuesday of each month at two in the afternoon. They discuss one book each month, chosen by the group. The group has eighteen members and is led by the librarian, Mrs. Johnson. They've been meeting for five years.",
    questions: [
      { question: "When does the book group meet?", correctAnswer: "last Tuesday" },
      { question: "What time do they meet?", correctAnswer: "two" },
      { question: "How many members are there?", correctAnswer: "eighteen" },
      { question: "Who leads the group?", correctAnswer: "Mrs. Johnson" }
    ]
  },
  {
    id: 'memory-92',
    type: 'story',
    content: "The senior center has a painting class every Monday afternoon from one to three. Students learn watercolor and acrylic painting techniques. The class is taught by a local artist named Mr. Chen. All supplies are provided, and the class costs ten dollars per session. There are twelve students enrolled.",
    questions: [
      { question: "What day is painting class?", correctAnswer: "Monday" },
      { question: "What time is the class?", correctAnswer: "one to three" },
      { question: "What techniques do they learn?", correctAnswer: "watercolor, acrylic" },
      { question: "How much does it cost?", correctAnswer: "ten dollars" }
    ]
  },
  {
    id: 'memory-93',
    type: 'list',
    content: "The school supplies include: notebooks, pens, pencils, erasers, a ruler, and a calculator.",
    questions: [
      { question: "What for writing?", correctAnswer: "notebooks, pens, pencils" },
      { question: "What for correcting?", correctAnswer: "erasers" },
      { question: "What for measuring?", correctAnswer: "ruler" },
      { question: "What for math?", correctAnswer: "calculator" }
    ]
  },
  {
    id: 'memory-94',
    type: 'story',
    content: "The community center has a cooking class every Wednesday morning at ten. They teach basic cooking skills and healthy recipes. Last week, they made vegetable soup and whole wheat bread. The class is free for seniors and includes all ingredients. The instructor is a retired chef named Chef Maria.",
    questions: [
      { question: "What day is cooking class?", correctAnswer: "Wednesday" },
      { question: "What time does it start?", correctAnswer: "ten" },
      { question: "What did they make last week?", correctAnswer: "vegetable soup, whole wheat bread" },
      { question: "Who is the instructor?", correctAnswer: "Chef Maria" }
    ]
  },
  {
    id: 'memory-95',
    type: 'story',
    content: "The local park has a nature center with exhibits about local wildlife and plants. The center is open Tuesday through Sunday from nine to five. They offer guided nature walks every Saturday at ten in the morning. The walks last about one hour and are suitable for all ages. Admission is free.",
    questions: [
      { question: "What does the park have?", correctAnswer: "nature center" },
      { question: "What are the exhibits about?", correctAnswer: "wildlife, plants" },
      { question: "When are nature walks?", correctAnswer: "Saturday at ten" },
      { question: "How long do walks last?", correctAnswer: "one hour" }
    ]
  },
  {
    id: 'memory-96',
    type: 'list',
    content: "The sewing kit has: thread, needles, pins, scissors, buttons, and a thimble.",
    questions: [
      { question: "What for stitching?", correctAnswer: "thread, needles" },
      { question: "What for holding fabric?", correctAnswer: "pins" },
      { question: "What tool?", correctAnswer: "scissors" },
      { question: "What for protection?", correctAnswer: "thimble" }
    ]
  },
  {
    id: 'memory-97',
    type: 'story',
    content: "The senior center has a music appreciation class every Thursday at three in the afternoon. They listen to classical music and learn about different composers. The class is taught by a retired music teacher named Dr. Williams. Each session focuses on a different time period or composer. The class has fourteen students.",
    questions: [
      { question: "What day is music appreciation class?", correctAnswer: "Thursday" },
      { question: "What time is the class?", correctAnswer: "three" },
      { question: "What type of music do they study?", correctAnswer: "classical" },
      { question: "Who teaches the class?", correctAnswer: "Dr. Williams" }
    ]
  },
  {
    id: 'memory-98',
    type: 'story',
    content: "The community center has a pottery studio with wheels and kilns. Classes are offered every Tuesday and Thursday evening from six to eight. Students learn to make bowls, vases, and plates. The instructor is a professional potter named Ms. Anderson. The class costs fifteen dollars per session.",
    questions: [
      { question: "What does the center have?", correctAnswer: "pottery studio" },
      { question: "What equipment is available?", correctAnswer: "wheels, kilns" },
      { question: "When are classes?", correctAnswer: "Tuesday and Thursday evening" },
      { question: "What do students learn to make?", correctAnswer: "bowls, vases, plates" }
    ]
  },
  {
    id: 'memory-99',
    type: 'list',
    content: "The gardening tools include: a shovel, rake, hoe, watering can, gloves, and pruning shears.",
    questions: [
      { question: "What for digging?", correctAnswer: "shovel" },
      { question: "What for leveling?", correctAnswer: "rake" },
      { question: "What for watering?", correctAnswer: "watering can" },
      { question: "What for cutting?", correctAnswer: "pruning shears" }
    ]
  },
  {
    id: 'memory-100',
    type: 'story',
    content: "The local historical society has monthly meetings on the first Thursday of each month at seven in the evening. They discuss local history and organize preservation projects. The society has been active for fifty years and has over one hundred members. The president is Mr. Thompson, who has served for ten years.",
    questions: [
      { question: "When does the historical society meet?", correctAnswer: "first Thursday" },
      { question: "What time do they meet?", correctAnswer: "seven" },
      { question: "How long has the society been active?", correctAnswer: "fifty years" },
      { question: "Who is the president?", correctAnswer: "Mr. Thompson" }
    ]
  }
];

export const attentionGames: AttentionGame[] = [
  {
    id: 'attention-1',
    type: 'word_detection',
    content: "The cat sat on the mat. The mat was red. The cat was very happy on the red mat. Then the cat jumped off the mat and walked away.",
    targetWord: "mat",
    correctCount: 4
  },
  {
    id: 'attention-2',
    type: 'word_detection',
    content: "Birds sing in the morning. The morning sun is bright. Every morning I wake up to hear the birds. What a beautiful morning it is today.",
    targetWord: "morning",
    correctCount: 4
  },
  {
    id: 'attention-3',
    type: 'word_detection',
    content: "The garden has many flowers. Red flowers, yellow flowers, and blue flowers bloom in the garden. My grandmother loved flowers. She would pick fresh flowers every day.",
    targetWord: "flowers",
    correctCount: 5
  },
  {
    id: 'attention-4',
    type: 'counting',
    content: "One apple, two oranges, three bananas, one pear, two apples, one orange, three pears, and two bananas.",
    targetWord: "apple",
    correctCount: 3
  },
  {
    id: 'attention-5',
    type: 'word_detection',
    content: "The house on the hill has a big window. Through the window you can see the garden. The window faces east, so the sun shines through the window every morning.",
    targetWord: "window",
    correctCount: 4
  }
];

export const languageGames: LanguageGame[] = [
  {
    id: 'language-1',
    type: 'sentence_completion',
    prompt: "The sun rises in the east and sets in the...",
    expectedResponses: ['west'],
    difficultyLevel: 1
  },
  {
    id: 'language-2',
    type: 'sentence_completion',
    prompt: "A bird has feathers, but a fish has...",
    expectedResponses: ['scales', 'fins'],
    difficultyLevel: 1
  },
  {
    id: 'language-3',
    type: 'sentence_completion',
    prompt: "We use our eyes to see and our ears to...",
    expectedResponses: ['hear', 'listen'],
    difficultyLevel: 1
  },
  {
    id: 'language-4',
    type: 'naming',
    prompt: "Name three things you might find in a kitchen.",
    expectedResponses: ['stove', 'refrigerator', 'sink', 'table', 'chair', 'pot', 'pan', 'plate', 'cup', 'fork', 'knife', 'spoon', 'oven', 'microwave', 'toaster'],
    difficultyLevel: 1
  },
  {
    id: 'language-5',
    type: 'naming',
    prompt: "Name three different animals that can fly.",
    expectedResponses: ['bird', 'butterfly', 'bee', 'bat', 'eagle', 'sparrow', 'robin', 'owl', 'parrot', 'duck', 'goose', 'crow', 'hawk', 'pigeon', 'hummingbird'],
    difficultyLevel: 1
  },
  {
    id: 'language-6',
    type: 'sentence_completion',
    prompt: "Roses are red, violets are...",
    expectedResponses: ['blue'],
    difficultyLevel: 1
  },
  {
    id: 'language-7',
    type: 'description',
    prompt: "Describe what you see when you look out a window on a sunny day.",
    expectedResponses: ['sky', 'sun', 'trees', 'clouds', 'grass', 'light', 'bright'],
    difficultyLevel: 2
  },
  {
    id: 'language-8',
    type: 'naming',
    prompt: "Name three things that are typically the color green.",
    expectedResponses: ['grass', 'leaves', 'trees', 'frogs', 'peas', 'cucumbers', 'broccoli', 'lettuce', 'apples', 'plants'],
    difficultyLevel: 1
  }
];

export const processingSpeedGames: ProcessingSpeedGame[] = [
  {
    id: 'speed-1',
    type: 'category_naming',
    category: 'fruits',
    timeLimit: 30,
    minimumResponses: 5
  },
  {
    id: 'speed-2',
    type: 'category_naming',
    category: 'animals',
    timeLimit: 30,
    minimumResponses: 5
  },
  {
    id: 'speed-3',
    type: 'category_naming',
    category: 'colors',
    timeLimit: 20,
    minimumResponses: 6
  },
  {
    id: 'speed-4',
    type: 'object_naming',
    category: 'things in a living room',
    timeLimit: 30,
    minimumResponses: 5
  },
  {
    id: 'speed-5',
    type: 'word_association',
    category: 'words that rhyme with "day"',
    timeLimit: 25,
    minimumResponses: 4
  },
  {
    id: 'speed-6',
    type: 'category_naming',
    category: 'countries',
    timeLimit: 30,
    minimumResponses: 4
  },
  {
    id: 'speed-7',
    type: 'object_naming',
    category: 'things you wear',
    timeLimit: 25,
    minimumResponses: 5
  }
];

// Get a random game of each type
export function getRandomMemoryGame(): MemoryGame {
  return memoryGames[Math.floor(Math.random() * memoryGames.length)];
}

export function getRandomAttentionGame(): AttentionGame {
  return attentionGames[Math.floor(Math.random() * attentionGames.length)];
}

export function getRandomLanguageGame(): LanguageGame {
  return languageGames[Math.floor(Math.random() * languageGames.length)];
}

export function getRandomProcessingSpeedGame(): ProcessingSpeedGame {
  return processingSpeedGames[Math.floor(Math.random() * processingSpeedGames.length)];
}

export const categorySortingGames: CategorySortingGame[] = [
  {
    id: 'category-1',
    type: 'single_choice',
    question: 'Which one is a vegetable?',
    options: ['carrot', 'airplane', 'book'],
    correctAnswer: 'carrot',
    category: 'vegetables',
    difficultyLevel: 1
  },
  {
    id: 'category-2',
    type: 'single_choice',
    question: 'Which one is a fruit?',
    options: ['banana', 'car', 'table'],
    correctAnswer: 'banana',
    category: 'fruits',
    difficultyLevel: 1
  },
  {
    id: 'category-3',
    type: 'single_choice',
    question: 'Which one is an animal?',
    options: ['dog', 'chair', 'pencil'],
    correctAnswer: 'dog',
    category: 'animals',
    difficultyLevel: 1
  },
  {
    id: 'category-4',
    type: 'single_choice',
    question: 'Which one is a color?',
    options: ['red', 'house', 'running'],
    correctAnswer: 'red',
    category: 'colors',
    difficultyLevel: 1
  },
  {
    id: 'category-5',
    type: 'single_choice',
    question: 'Which one is a body part?',
    options: ['hand', 'cloud', 'music'],
    correctAnswer: 'hand',
    category: 'body parts',
    difficultyLevel: 1
  },
  {
    id: 'category-6',
    type: 'single_choice',
    question: 'Which one is a tool?',
    options: ['hammer', 'flower', 'ocean'],
    correctAnswer: 'hammer',
    category: 'tools',
    difficultyLevel: 2
  },
  {
    id: 'category-7',
    type: 'single_choice',
    question: 'Which one is a type of weather?',
    options: ['rain', 'computer', 'guitar'],
    correctAnswer: 'rain',
    category: 'weather',
    difficultyLevel: 2
  },
  {
    id: 'category-8',
    type: 'single_choice',
    question: 'Which one is something you wear?',
    options: ['shirt', 'mountain', 'river'],
    correctAnswer: 'shirt',
    category: 'clothing',
    difficultyLevel: 2
  },
  {
    id: 'category-9',
    type: 'single_choice',
    question: 'Which one is a type of transportation?',
    options: ['bicycle', 'tree', 'song'],
    correctAnswer: 'bicycle',
    category: 'transportation',
    difficultyLevel: 2
  },
  {
    id: 'category-10',
    type: 'single_choice',
    question: 'Which one is a kitchen item?',
    options: ['spoon', 'star', 'wind'],
    correctAnswer: 'spoon',
    category: 'kitchen items',
    difficultyLevel: 2
  },
  {
    id: 'category-11',
    type: 'single_choice',
    question: 'Which one is a musical instrument?',
    options: ['piano', 'mountain', 'cloud'],
    correctAnswer: 'piano',
    category: 'musical instruments',
    difficultyLevel: 2
  },
  {
    id: 'category-12',
    type: 'single_choice',
    question: 'Which one is a type of building?',
    options: ['hospital', 'butterfly', 'ocean'],
    correctAnswer: 'hospital',
    category: 'buildings',
    difficultyLevel: 2
  },
  {
    id: 'category-13',
    type: 'single_choice',
    question: 'Which one is a type of tree?',
    options: ['oak', 'television', 'dance'],
    correctAnswer: 'oak',
    category: 'trees',
    difficultyLevel: 2
  },
  {
    id: 'category-14',
    type: 'single_choice',
    question: 'Which one is a type of bird?',
    options: ['robin', 'computer', 'mountain'],
    correctAnswer: 'robin',
    category: 'birds',
    difficultyLevel: 2
  },
  {
    id: 'category-15',
    type: 'single_choice',
    question: 'Which one is a type of sport?',
    options: ['tennis', 'moon', 'pencil'],
    correctAnswer: 'tennis',
    category: 'sports',
    difficultyLevel: 2
  }
];

export const patternCompletionGames: PatternCompletionGame[] = [
  {
    id: 'pattern-1',
    type: 'color',
    pattern: ['red', 'blue', 'red', 'blue'],
    missingIndex: 4,
    options: ['red', 'green', 'yellow'],
    correctAnswer: 'red'
  },
  {
    id: 'pattern-2',
    type: 'color',
    pattern: ['green', 'yellow', 'green', 'yellow'],
    missingIndex: 4,
    options: ['green', 'blue', 'red'],
    correctAnswer: 'green'
  },
  {
    id: 'pattern-3',
    type: 'number',
    pattern: ['one', 'two', 'three', 'one', 'two'],
    missingIndex: 5,
    options: ['three', 'four', 'five'],
    correctAnswer: 'three'
  },
  {
    id: 'pattern-4',
    type: 'number',
    pattern: ['two', 'four', 'six', 'two', 'four'],
    missingIndex: 5,
    options: ['six', 'eight', 'ten'],
    correctAnswer: 'six'
  },
  {
    id: 'pattern-5',
    type: 'word',
    pattern: ['cat', 'dog', 'cat', 'dog'],
    missingIndex: 4,
    options: ['cat', 'bird', 'fish'],
    correctAnswer: 'cat'
  },
  {
    id: 'pattern-6',
    type: 'word',
    pattern: ['apple', 'banana', 'apple', 'banana'],
    missingIndex: 4,
    options: ['apple', 'orange', 'grape'],
    correctAnswer: 'apple'
  },
  {
    id: 'pattern-7',
    type: 'color',
    pattern: ['blue', 'red', 'blue', 'red', 'blue'],
    missingIndex: 5,
    options: ['red', 'yellow', 'green'],
    correctAnswer: 'red'
  },
  {
    id: 'pattern-8',
    type: 'number',
    pattern: ['one', 'one', 'two', 'one', 'one'],
    missingIndex: 5,
    options: ['two', 'three', 'four'],
    correctAnswer: 'two'
  },
  {
    id: 'pattern-9',
    type: 'word',
    pattern: ['up', 'down', 'up', 'down'],
    missingIndex: 4,
    options: ['up', 'left', 'right'],
    correctAnswer: 'up'
  },
  {
    id: 'pattern-10',
    type: 'color',
    pattern: ['yellow', 'red', 'yellow', 'red'],
    missingIndex: 4,
    options: ['yellow', 'blue', 'green'],
    correctAnswer: 'yellow'
  }
];

export function getRandomCategorySortingGame(): CategorySortingGame {
  return categorySortingGames[Math.floor(Math.random() * categorySortingGames.length)];
}

export function getRandomPatternCompletionGame(): PatternCompletionGame {
  return patternCompletionGames[Math.floor(Math.random() * patternCompletionGames.length)];
}

// Sample insights for demo
export const sampleInsights = [
  {
    id: 'sample-1',
    timestamp: new Date(),
    type: 'language' as const,
    severity: 'info' as const,
    title: 'Morning Clarity Strong',
    description: 'Language complexity scores are consistently 15% higher during morning conversations compared to evening.',
    recommendation: 'Consider scheduling important calls and activities before noon.'
  },
  {
    id: 'sample-2',
    timestamp: new Date(),
    type: 'memory' as const,
    severity: 'info' as const,
    title: 'Memory Recall Stable',
    description: 'Memory recall performance has remained steady over the past two weeks with accuracy averaging 78%.',
    recommendation: 'Continue with current memory activities to maintain this positive trend.'
  },
  {
    id: 'sample-3',
    timestamp: new Date(),
    type: 'pattern' as const,
    severity: 'notable' as const,
    title: 'Evening Repetition Pattern',
    description: 'Increased repetition of questions and phrases detected in conversations after 5 PM.',
    recommendation: 'This is a common pattern. Consider earlier dinner times and calming evening routines.'
  },
  {
    id: 'sample-4',
    timestamp: new Date(),
    type: 'emotion' as const,
    severity: 'info' as const,
    title: 'Calm Engagement Dominant',
    description: 'Emotional state analysis shows calm engagement as the primary state in 65% of interactions.',
    recommendation: 'The current interaction patterns are creating a comfortable experience.'
  },
  {
    id: 'sample-5',
    timestamp: new Date(),
    type: 'attention' as const,
    severity: 'info' as const,
    title: 'Focus Duration Improving',
    description: 'Attention span during activities has increased by 12% over the past month.',
    recommendation: 'The brain games are having a positive effect on sustained attention.'
  }
];

