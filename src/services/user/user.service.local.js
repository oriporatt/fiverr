import { storageService } from '../async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}

async function getUsers() {
    const users = await storageService.query('user')
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get('user', userId)
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({ _id }) {
    const user = await storageService.get('user', _id)
    // user.score = score
    await storageService.put('user', user)

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // userCred.score = 10000

    const user = await storageService.post('user', userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	user = { 
        _id: user._id, 
        fullname: user.fullname, 
        imgUrl: user.imgUrl, 
        isAdmin: user.isAdmin 
    }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createAdmin() {
    const user = {
        username: 'admin',
        password: 'admin',
        fullname: 'Mustafa Adminsky',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    }

    const newUser = await storageService.post('user', userCred)
    console.log('newUser: ', newUser)
}


// check w/ GAL about this part should be here or local storage? why dont use USER
_initUsers()

async function _initUsers(){
  let users=[]
  users = await storageService.query('user')

  if (!users || users.length===0){
    const dummyUsersData =
    [
        {
          "_id": "s101",
          "username": "hassan",
          "fullname": "Hassan Malik",
          "password": "555",
          "cv": "I am a certified digital marketer with 7 years of experience in SEO, social media marketing, and PPC campaigns. I have worked with brands across various industries, helping them boost their online presence and maximize their ROI. Whether you need keyword research, Facebook ads, or content strategy, I am here to provide tailored solutions for your business growth.",
          "level": "premium",
          "rate": 4.8,
          "from": "Pakistan",
          "memberSince": 2014,
          "avgResponseTime": 15,
          "languages": ["English", "Urdu"],
          "imageUrl": "https://randomuser.me/api/portraits/men/50.jpg"
        },
        {
          "_id": "s102",
          "fullname": "Elena Petrova",
          "username": "Elena",
          "password": "555",
          "cv": "I am a creative graphic designer with over 6 years of experience in branding, logo design, and illustration. I have helped businesses establish strong visual identities by crafting modern, eye-catching designs. My skills include Adobe Illustrator, Photoshop, and Figma. Let's work together to create stunning visuals that represent your brand.",
          "level": "standard",
          "rate": 4.6,
          "from": "Russia",
          "memberSince": 2018,
          "avgResponseTime": 22,
          "languages": ["Russian", "English"],
          "imageUrl": "https://randomuser.me/api/portraits/women/32.jpg"
        },
        {
          "_id": "s103",
          "fullname": "James Carter",
          "username":"James",
          "password": "555",
          "cv": "As a professional video editor with 5+ years of experience, I specialize in producing high-quality videos for YouTube, social media, and corporate presentations. My expertise includes Adobe Premiere Pro, After Effects, and DaVinci Resolve. I ensure smooth transitions, engaging effects, and polished edits to bring your vision to life.",
          "level": "basic",
          "rate": 4.3,
          "from": "United States",
          "memberSince": 2019,
          "avgResponseTime": 30,
          "languages": ["English"],
          "imageUrl": "https://randomuser.me/api/portraits/men/41.jpg"
        },
        {
          "_id": "s104",
          "fullname": "Mei Ling",
          "username": "Mei",
          "password": "555",
          "cv": "I am a highly skilled translator specializing in English to Mandarin and vice versa. With over 10 years of experience, I have worked with businesses, authors, and content creators to provide accurate and culturally appropriate translations. My services cover documents, websites, and subtitles. Let’s bridge the language barrier together!",
          "level": "premium",
          "rate": 4.9,
          "from": "China",
          "memberSince": 2013,
          "avgResponseTime": 10,
          "languages": ["Mandarin", "English"],
          "imageUrl": "https://randomuser.me/api/portraits/women/21.jpg"
        },
        {
          "_id": "s105",
          "fullname": "Ricardo Mendes",
          "username": "Ricardo",
          "password": "555",
          "cv": "As a professional WordPress developer, I specialize in designing, customizing, and optimizing websites for businesses and individuals. With 6 years of experience, I have built responsive, fast-loading, and SEO-friendly websites. I can help you create a stunning online presence that meets your business needs.",
          "level": "standard",
          "rate": 4.5,
          "from": "Brazil",
          "memberSince": 2017,
          "avgResponseTime": 18,
          "languages": ["Portuguese", "English"],
          "imageUrl": "https://randomuser.me/api/portraits/men/53.jpg"
        },
        {
          "_id": "s106",
          "fullname": "Aisha Yusuf",
          "username": "Aisha",
          "password": "555",
          "cv": "I am a professional content writer and editor with 8 years of experience crafting compelling articles, blogs, and website content. My expertise includes SEO writing, ghostwriting, and technical content creation. I have worked with clients from diverse industries to deliver engaging and informative pieces that drive traffic and conversions.",
          "level": "premium",
          "rate": 4.8,
          "from": "Nigeria",
          "memberSince": 2015,
          "avgResponseTime": 12,
          "languages": ["English", "Hausa"],
          "imageUrl": "https://randomuser.me/api/portraits/women/14.jpg"
        },
        {
          "_id": "s107",
          "fullname": "Daniel Schmidt",
          "username": "Daniel",
          "password": "555",
          "cv": "I am a professional 3D artist with expertise in modeling, rendering, and animation. With over 7 years of experience in Blender and Maya, I have worked on game assets, product designs, and architectural visualizations. Whether you need a realistic render or stylized 3D characters, I am here to bring your ideas to life.",
          "level": "standard",
          "rate": 4.6,
          "from": "Germany",
          "memberSince": 2016,
          "avgResponseTime": 20,
          "languages": ["German", "English"],
          "imageUrl": "https://randomuser.me/api/portraits/men/23.jpg"
        },
        {
          "_id": "s108",
          "fullname": "Isabella Dupont",
          "username": "Isabella",
          "password": "555",
          "cv": "As a social media strategist, I help businesses grow their online presence with targeted marketing campaigns. I have 5 years of experience managing Instagram, Facebook, and LinkedIn for brands worldwide. From content creation to analytics, I offer a full range of services to maximize your engagement and reach.",
          "level": "basic",
          "rate": 4.4,
          "from": "France",
          "memberSince": 2019,
          "avgResponseTime": 28,
          "languages": ["French", "English"],
          "imageUrl": "https://randomuser.me/api/portraits/women/19.jpg"
        },
        {
          "_id": "s109",
          "fullname": "Mohammed Al-Farsi",
          "username": "Mohammed",
          "password": "555",
          "cv": "I am a skilled mobile app developer specializing in Android and iOS applications. With 6 years of experience, I have built apps for e-commerce, health, and education industries. My tech stack includes Flutter, React Native, and Swift. If you need a reliable and user-friendly mobile app, I am here to help!",
          "level": "premium",
          "rate": 4.9,
          "from": "United Arab Emirates",
          "memberSince": 2017,
          "avgResponseTime": 14,
          "languages": ["Arabic", "English"],
          "imageUrl": "https://randomuser.me/api/portraits/men/30.jpg"
        },
        {
          "_id": "s110",
          "fullname": "Natalia Ivanova",
          "username": "Natalia",
          "password": "555",
          "cv": "I am a talented UX/UI designer with a passion for creating beautiful and functional user experiences. With over 5 years of experience, I have worked with startups and established companies to design websites and mobile apps that are both aesthetically pleasing and easy to use. Let’s make your product stand out!",
          "level": "standard",
          "rate": 4.7,
          "from": "Ukraine",
          "memberSince": 2018,
          "avgResponseTime": 16,
          "languages": ["Ukrainian", "English", "Russian"],
          "imageUrl": "https://randomuser.me/api/portraits/women/25.jpg"
        }
    ]
    localStorage.setItem('user', JSON.stringify(dummyUsersData))
    return dummyUsersData
  }
}

