
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import {saveToStorage,loadFromStorage} from '../util.service'

const STORAGE_KEY = 'gig'

const categories = ['Graphics & Design','Programming & Tech','Digital Marketing',
    'Video & Animation','Writing & Translation','Music & Audio',
    'Business','Finance','AI Services',
    'Personal Growth','Consulting','Photography']

export const gigService = {
    query,
    getById,
    save,
    remove,
    categories,
    // addCarMsg
}
window.cs = gigService

_makeDummyGigs()



// txt: '', minPrice: 0 
async function query(filterBy) {

    var gigs = await storageService.query(STORAGE_KEY)
    const { txt, categoriesArray,
        minPrice, maxPrice,
        deliveryMaxTime,
        filterPriceGroup,
        sellerLevels,sellerRate,
        sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description)|| regex.test(gig.owner.fullname))
    }

    if (sellerLevels.length>0){
        gigs = gigs.filter(gig=>sellerLevels.includes(gig.owner.level))
    }

    if (sellerRate){
        gigs = gigs.filter(gig=>gig.owner.rate>=sellerRate)
    }

    if (deliveryMaxTime!=='anytime'){
        gigs = gigs.filter(gig=>gig.daysToMake<=deliveryMaxTime)
    }


    if (filterPriceGroup){
        if (minPrice && !maxPrice){
            gigs = gigs.filter(gig=>gig.price>=minPrice)
        }else if (minPrice && maxPrice){
            gigs = gigs.filter(gig=>gig.price>=minPrice && gig.price<=maxPrice)
        }else if (!minPrice && maxPrice){
            gigs = gigs.filter(gig=>gig.price<=maxPrice)
        }
    }

    if (categoriesArray) {
        if (
            (categoriesArray.every(category=>category.active===true))||
            (categoriesArray.every(category=>category.active===false))||
            (categoriesArray.length===0)
        ){
            //pass;
        }else{
            const chosenFilterTags=categoriesArray.filter(tag=>tag.active===true)
            const chosenFilterTagsList= chosenFilterTags.map(item=>item.category)
            
            const filteredGigs = gigs.filter(gig =>
                gig.tags.some(tag => chosenFilterTagsList.includes(tag))
            )
            gigs= filteredGigs
        }
    }

    if(sortField === 'price' || sortField === 'daysToMake'){
        gigs.sort((gig1, gig2) => 
            (gig1[sortField] - gig2[sortField]) * +sortDir)
    }
    
    // cars = cars.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return gigs
}

function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}

async function remove(carId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, carId)
}

async function save(car) {
    var savedCar
    if (car._id) {
        const carToSave = {
            _id: car._id,
            price: car.price,
            speed: car.speed,
        }
        savedCar = await storageService.put(STORAGE_KEY, carToSave)
    } else {
        const carToSave = {
            vendor: car.vendor,
            price: car.price,
            speed: car.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedCar = await storageService.post(STORAGE_KEY, carToSave)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    // Later, this is all done by the backend
    const car = await getById(carId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    car.msgs.push(msg)
    await storageService.put(STORAGE_KEY, car)

    return msg
}


function _makeDummyGigs(){
    let gigs = loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {
        gigs=
        [
            {
                "_id": "i101",
                "title": "I will design your logo",
                "price": 12,
                "owner": {
                    "_id": "s101",
                    "fullname": "Hassan Malik",
                    "imgUrl": "https://randomuser.me/api/portraits/men/50.jpg",
                    "level": "premium",
                    "rate":  4.8
                },
                "daysToMake": 3,
                "description": "Make unique logo...",
                "imgUrl": "",
                "tags": [
                    'Graphics & Design',
                    'Finance',
                    'Consulting'
                ],
                "likedByUsers": ['mini-user'],
                "imgs": [
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737306769/i9KtW3QsxDK7ise5azCJpN-1200-80_jwegtj.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737306730/download_oazfmh.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737306932/download_y0ktkt.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737306928/download_ultd3k.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737306968/download_ib6mgm.png",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737306960/download_w0geic.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307761/seo-benefit-1_cpxktd.png",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307767/download_ckd5jc.png",
                    
                ],
                "aboutGig": {
                    "title1": "Professional Logo Design",
                    "p1": "Our logo design service will give your business a unique, creative, and memorable logo that stands out in the market. A well-designed logo is essential for creating a lasting first impression and can build trust with your potential customers. With our expertise, we ensure your logo perfectly represents your brand identity and message, helping you stand out from competitors.",
                    "title2": "Custom Designs",
                    "p2": "We craft custom logos tailored to your brand’s values and identity, ensuring your logo speaks directly to your audience. Our design process is collaborative, meaning we work closely with you to understand your vision and deliver a logo that reflects your brand's essence. Whether you're looking for a minimalist design or something more elaborate, we adapt our style to meet your needs. Key features of our custom designs include:\n- Tailored to your brand’s identity\n- Versatile across different mediums\n- Original concepts to avoid clichés",
                    "title3": "Affordable and Timely",
                    "p3": "Get high-quality logo designs at an affordable price, with quick turnaround times to meet your business needs. We understand that timing is critical for businesses, which is why we offer fast delivery without compromising on quality. Our goal is to provide you with a top-notch logo design that you can start using right away, while staying within your budget."
                }
            },
            {
                "_id": "i102",
                "title": "I will create a modern website",
                "price": 50,
                "owner": {
                    "_id": "s102",
                    "fullname": "Elena Petrova",
                    "imgUrl": "https://randomuser.me/api/portraits/women/32.jpg",
                    "level": "standard",
                    "rate": 4.6
                },
                "daysToMake": 10,
                "description": "Build a responsive and modern website tailored to your needs.",
                "imgUrl": "",
                "tags": [
                    'Personal Growth',
                    'Consulting',
                    'Photography'
                ],
                "likedByUsers": ['mini-user', 'pro-user'],
                "imgs": [
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737306932/download_y0ktkt.jpg",
            
                ],
                "aboutGig": {
                    "title1": "Custom Website Creation",
                    "p1": "Get a website designed specifically for your brand with all the modern features, responsive across all devices. A modern, user-friendly website is crucial for establishing your online presence. We ensure that your website is easy to navigate, visually appealing, and optimized for various screen sizes, from desktops to mobile phones.",
                    "title2": "Mobile-Friendly Designs",
                    "p2": "Your website will be fully optimized for mobile devices to ensure a smooth browsing experience for visitors. With over 50% of web traffic coming from mobile devices, having a mobile-optimized website is more important than ever. Our team uses the latest techniques in responsive design to ensure your site looks great on any screen.",
                    "title3": "SEO Optimized",
                    "p3": "We create websites with SEO best practices to help your site rank higher in search engines, increasing visibility. Our websites are built with SEO in mind, ensuring that your content is structured in a way that search engines can easily index. This increases the chances of your site being discovered by potential customers."
                }
            },
            {
                "_id": "i103",
                "title": "I will write engaging blog posts",
                "price": 20,
                "owner": {
                    "_id": "s103",
                    "fullname": "James Carter",
                    "imgUrl": "https://randomuser.me/api/portraits/men/41.jpg",
                    "level": "basic",
                    "rate": 4.3
                },
                "daysToMake": 5,
                "description": "Craft unique and engaging blog content for your audience.",
                "imgUrl": "",
                "tags": [
                    'Finance',
                    'AI Services'
                ],
                "likedByUsers": ['user123'],
                "imgs": [
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737306968/download_ib6mgm.png",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737306960/download_w0geic.jpg",
            
                ],
                "aboutGig": {
                    "title1": "Engaging Content Creation",
                    "p1": "We provide high-quality, engaging blog posts that will capture the attention of your target audience and boost your website traffic. Each post is crafted to provide value to your readers, whether through informative content or entertaining stories. Our goal is to help you connect with your audience in a meaningful way that keeps them coming back for more.",
                    "title2": "SEO-Optimized Posts",
                    "p2": "Our blog posts are written with SEO in mind, ensuring better search engine rankings and more organic traffic to your site. We incorporate the right keywords, headers, and meta descriptions to make sure your posts reach the top of search results, helping to increase your visibility online. The benefits of SEO-optimized posts include:\n- Better ranking in search engines\n- More organic traffic\n- Increased conversions and sales",
                    "title3": "Tailored to Your Audience",
                    "p3": "We write content that speaks to your audience’s needs and interests, tailored to fit your brand voice and style. By understanding your audience's pain points, we create blog posts that resonate and build a loyal following. Whether you want educational content or entertaining blogs, we have you covered."
                }
            },
            {
                "_id": "i104",
                "title": "I will design an eye-catching business card",
                "price": 15,
                "owner": {
                    "_id": "s104",
                    "fullname": "Mei Ling",
                    "imgUrl": "https://randomuser.me/api/portraits/women/21.jpg",
                    "level": "premium",
                    "rate":  4.9
                },
                "daysToMake": 2,
                "description": "Design professional and memorable business cards for your brand.",
                "imgUrl": "",
                "tags": [
                    "Photography"
                ],
                "likedByUsers": ['pro-user'],
                "imgs": [
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307415/images_i83hev.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307459/download_uc4mqt.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307497/download_zwlruz.jpg",
                ],
                "aboutGig": {
                    "title1": "Business Card Design",
                    "p1": "We create custom, professional business cards that make a lasting impression and reflect your brand identity. A well-designed business card is not only a tool for sharing your contact details but also an essential marketing asset that communicates your professionalism. Our business cards are designed to impress, whether you're handing them out at a networking event or leaving them on your desk for clients.",
                    "title2": "Creative and Unique Designs",
                    "p2": "Our designs are tailored to stand out, with options for both modern and classic business card styles. Whether you prefer a minimalist design or something with bold colors, we work with you to create the perfect card. Features of our business card designs include:\n- High-quality card stock\n- Full color options\n- Custom logo integration\n- High-end finishes like matte, glossy, or embossed",
                    "title3": "High-Quality Printing Options",
                    "p3": "We offer a range of high-quality printing services to bring your design to life. Whether you need a simple print run or want a luxury card that feels premium, we provide options to suit your needs. Our business cards are printed using the latest technology, ensuring crisp, sharp images and vibrant colors."
                }
            },
            {
                "_id": "i105",
                "title": "I will write compelling ad copy",
                "price": 20,
                "owner": {
                    "_id": "s105",
                    "fullname": "Sarah Greene",
                    "imgUrl": "https://randomuser.me/api/portraits/women/45.jpg",
                    "level": "standard",
                    "rate": 4.5
                },
                "daysToMake": 3,
                "description": "Write persuasive ad copy that boosts conversions and drives sales.",
                "imgUrl": "",
                "tags": [
                    "Marketing",
                    "Writing"
                ],
                "likedByUsers": ['mini-user'],
                "imgs": [
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307497/download_zwlruz.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307502/download_tmltz6.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307555/download_wczwcs.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307549/four-corporate-business-flyer-design-templates_psg9oe.jpg"
                ],
                "aboutGig": {
                    "title1": "Persuasive Ad Copy",
                    "p1": "We specialize in creating compelling ad copy that grabs attention and motivates action. Whether you're advertising on social media, Google, or other platforms, we craft copy that resonates with your target audience and increases conversions. Our goal is to help you create ads that not only stand out but also deliver results.",
                    "title2": "Tailored for Your Audience",
                    "p2": "We understand the importance of knowing your audience, and we write ad copy that speaks directly to them. Our copy is tailored to match your brand voice, making sure that it fits seamlessly with your marketing strategy. Key features of our ad copy include:\n- Focus on your product’s benefits\n- Clear call-to-action\n- Catchy headlines\n- Short and engaging content",
                    "title3": "Optimized for Conversions",
                    "p3": "We use data-driven strategies to write ad copy that maximizes your return on investment. We test different messaging, keywords, and ad formats to find the most effective combination for driving sales. Whether you are looking to generate leads or increase sales, our ad copy is crafted with conversions in mind."
                }
            },
            {
                "_id": "i106",
                "title": "I will create social media content",
                "price": 30,
                "owner": {
                    "_id": "s106",
                    "fullname": "Ava Thompson",
                    "imgUrl": "https://randomuser.me/api/portraits/women/23.jpg",
                    "level": "premium",
                    "rate": 5.0
                },
                "daysToMake": 4,
                "description": "Create engaging content for your social media profiles to increase visibility and engagement.",
                "imgUrl": "",
                "tags": [
                    "Marketing",
                    "Social Media"
                ],
                "likedByUsers": ['user987'],
                "imgs": [
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307555/download_wczwcs.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307549/four-corporate-business-flyer-design-templates_psg9oe.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307611/images_kcynbu.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307618/images_ghirkk.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307415/images_i83hev.jpg",
            
                ],
                "aboutGig": {
                    "title1": "Social Media Content Creation",
                    "p1": "We create high-quality, engaging content that will help you grow your social media presence. Our team specializes in crafting posts, ads, and articles that resonate with your audience and drive engagement. Whether you need Instagram posts, Facebook ads, or LinkedIn articles, we provide content that speaks to your followers and attracts new ones.",
                    "title2": "Tailored for Your Brand",
                    "p2": "We tailor the content to fit your brand's voice and target audience, ensuring consistency and relevance. Our goal is to help you build a strong online presence and connect with your followers through engaging content. We create:\n- Instagram Posts\n- Facebook Ads\n- Twitter Posts\n- LinkedIn Articles",
                    "title3": "Professional Design",
                    "p3": "Our content is designed professionally with high-quality graphics and copywriting to ensure that your brand stands out. We use the latest design trends and marketing strategies to create content that resonates with your audience and drives engagement."
                }
            },
            {
                "_id": "i107",
                "title": "I will assist with market research",
                "price": 40,
                "owner": {
                    "_id": "s107",
                    "fullname": "Tariq Ahmed",
                    "imgUrl": "https://randomuser.me/api/portraits/men/61.jpg",
                    "level": "premium",
                    "rate": 5.0
                },
                "daysToMake": 6,
                "description": "Conduct thorough market research and analysis to help your business grow.",
                "imgUrl": "",
                "tags": [
                    "Consulting",
                    "Marketing"
                ],
                "likedByUsers": ['user987'],
                "imgs": [
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307618/images_ghirkk.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307555/download_wczwcs.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307549/four-corporate-business-flyer-design-templates_psg9oe.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307611/images_kcynbu.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307618/images_ghirkk.jpg",
                    "https://res.cloudinary.com/deue4rbta/image/upload/c_fill,w_400,h_240/v1737307415/images_i83hev.jpg",
            
                ],
                "aboutGig": {
                    "title1": "In-Depth Market Research",
                    "p1": "We provide comprehensive market research services to give you insights into your industry, competitors, and customers. Our team uses a combination of qualitative and quantitative research methods to gather data that will help you make informed business decisions. We dive deep into your target market to understand their behavior, preferences, and buying patterns.",
                    "title2": "Competitive Analysis",
                    "p2": "We analyze your competitors to identify their strengths, weaknesses, and strategies. By understanding what your competitors are doing right (or wrong), we help you position your business effectively in the market. Our competitive analysis includes:\n- Identifying direct and indirect competitors\n- Assessing competitor strengths and weaknesses\n- Analyzing competitors' marketing strategies",
                    "title3": "Actionable Insights",
                    "p3": "Our market research results in actionable insights that can guide your business strategy. We provide you with clear recommendations based on our research, helping you make better decisions for growth. Whether you are entering a new market or launching a new product, our research can give you the insights you need to succeed."
                }
            }
        ]
        
        
       
        
        
        
        saveToStorage(STORAGE_KEY, gigs)
    }
}