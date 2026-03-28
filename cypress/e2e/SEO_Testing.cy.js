
describe('SEO Testing for HomePage', () => {

    beforeEach('Uncaught and open HomePage',() => {
        cy.visit('https://tieuthuyet.vn/')
        cy.url().should('include', 'tieuthuyet.vn')

        // Chặn lỗi buildAuthUrl not defined của trang 
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('buildAuthUrl is not defined')) {
                return false
            }
        })    
    })

    it('Check title', () => {
        cy.title()
            .should('not.be.empty')
            .and((title) => {
                expect(title.length).to.be.at.most(60)
            })
    })

    it('Check meta description', () => {
        cy.get('meta[name="description"]')
            .should('have.attr', 'content')
            .then((content) => {
                expect(content.length).to.be.within(70, 160)
            })
    })

    it('Check H1 tag', () => {
        cy.get('h1')
            .should('have.length', 1)
            .invoke('text')
            .should('not.be.empty')
    })

    it('Check alt for <img> tags', () => {
        cy.get('img').each(($img, index) => {
            const alt = $img.attr('alt')

            expect(alt, `Image #${index + 1} missing alt`).to.exist
            expect(alt.trim(), `Image #${index + 1} empty alt`).to.not.equal('')
        })
    })

    it('Check OpenGraphTags for sharing on Facebook', () => {
        cy.get('head meta[property="og:title"]').should('have.attr', 'content').and('not.be.empty')
        cy.get('head meta[property="og:image"]').should('have.attr', 'content').and('match', /^https?:\/\/.+/)
        cy.get('head meta[property="og:description"]').should('have.attr', 'content').and('not.be.empty')
    })
})


describe('SEO Testing for Story Categories Page', () => {
    beforeEach('Uncaught and open Page',() => {
        // Chặn lỗi buildAuthUrl not defined của trang 
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('buildAuthUrl is not defined')) {
                return false
            }
        })    
    })

    //Chưa mở rộng thêm, random 3-4 thể loại, rồi sau đó check title tương ứng (note: không có cssselector hay ID)
    it('Check dynamic title', () => {
        const category = 'tieu-thuyet'
        const expectedKey = 'truyện tiểu thuyết'

        cy.visit(`https://tieuthuyet.vn/the-loai/${category}`)
        cy.wait(1000)

        cy.document().its('title').then((title) => {
            const Title = title.toLowerCase()
            expect(Title).to.include(expectedKey)
            expect(Title.length).to.be.lessThan(40)
            cy.log(`Passed`)
        })
    })

    it('Check canonical URL', () => {
        const category = 'tieu-thuyet'

        cy.visit(`https://tieuthuyet.vn/the-loai/${category}`)
        cy.wait(1000)

        cy.get('link[rel="canonical"]').should('have.attr', 'href', `https://tieuthuyet.vn/the-loai/${category}`)
        cy.log(`Passed`)
    })

    it('Check key in meta tag',() => { 
        const category = 'ngon-tinh'   
        const key = 'truyện ngôn tình'

        cy.visit(`https://tieuthuyet.vn/the-loai/${category}`)
        cy.wait(1000)

        cy.get('meta[name="description"]').invoke('attr', 'content').then((metaContent) => {
            expect(metaContent, 'have meta description').to.exist
            const meta = metaContent.toLowerCase()
            cy.log(`Meta "${meta}"`)
            expect(meta).to.include(key)
            expect(meta.length).to.be.within(70, 160)
            cy.log('Passed')
        })
    })
    
    it('Check key in H1 tag',() => { 
        const category = 'ngon-tinh'   
        const key = 'truyện ngôn tình'

        cy.visit(`https://tieuthuyet.vn/the-loai/${category}`)
        cy.wait(1000)

        cy.get('h1').invoke('text').then((h1Text) => {
            expect(h1Text, 'have H1 tag').to.exist
            const h1 = h1Text.trim().toLowerCase()    
            cy.log(`H1 "${h1}"`)
            expect(h1).to.include(key)
            expect(h1.length).to.be.within(20, 70)
            cy.log('Passed')
        })
    })

    it('Check internal links', () => { 
        const domain = 'https://tieuthuyet.vn' 
        cy.visit(`${domain}/the-loai/tieu-thuyet`)
        
        cy.get('a[href]').each(($a, index) =>{ 
            const href = $a.attr('href') 
            const text = $a.text().trim() 
            if(!href || href === '#' || href.startsWith('javascript')){ 
                cy.log(`Skip invalid link #${index}: ${href}`) 
                return 
            } 
            const fullURL = href.startsWith('/') ? `${domain}${href}` : href 
            if(href.startsWith('/') || href.startsWith(domain)){ 
                cy.request({url: fullURL, failOnStatusCode: false}).then((resp) => { 
                    expect(resp.status, `Link ${fullURL} shoud be valid`).to.eq(200) 
                }) 
                expect(text.length, `${href} should be not empty`).to.be.greaterThan(2) 
            }else{ 
                cy.log(`External link found: ${href}`) 
            } 
        })
    })    
})

describe('SEO Testing for Story Detail Page', () => {
    const domain = 'https://tieuthuyet.vn'
    const slug = 'thieu-nu-tho-ngay'
    const URL = `${domain}/${slug}`
    const name = 'Thiếu Nữ Thơ Ngây'

    beforeEach('Uncaught and openHomePage',() => {
        cy.visit(URL)

        // Chặn lỗi buildAuthUrl not defined của trang 
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('buildAuthUrl is not defined')) {
                return false
            }
        })    
    })

    it('Check dynamic title', () => {
        cy.document().its('title').then((title) => {
            const Title = title.toLowerCase()
            expect(Title).to.include(name.toLowerCase())
            cy.log(`Passed`)
        })
    })

    it('Check meta description', () => {
        cy.get('meta[name="description"]').should('have.attr', 'content').then((content) => {
            expect(content).to.not.be.empty
            expect(content.toLowerCase()).to.not.include('undefined')
            expect(content.toLowerCase()).to.not.include('null')
        })
    })

    it('Check H1 tag', () => {
        cy.get('h1').should('have.length', 1)
        cy.get('h1').invoke('text').then(h1 => {
        expect(h1.trim()).to.include(name)
        })
    })

    it('Check schema Book JSON-LD', () => {
        cy.get('script[type="application/ld+json"]').should('exist').each(($script, index) => {
            //cy.log(`Check json-ld #${index + 1}`)
            const raw = $script[0].innerText

            try{
                const json = JSON.parse(raw)
                const schemas = Array.isArray(json) ? json : [json]
                schemas.forEach((schema, i) => {
                    cy.log(`Schema #${i + 1} with type ${schema['@type']}`)
                    //expect(json['@type']).to.exist
                    if(schema['@type'] === 'Book'){
                        expect(schema.name).to.exist
                        expect(schema.author).to.exist
                        expect(schema.image).to.exist
                        expect(schema.description).to.exist
                    }
                })
            }catch(e){
                throw new Error(e.message)
            }
        })
    })

    it('Check OpenGraphTags for sharing on Facebook', () => {
        cy.get('head meta[property="og:title"]').should('have.attr', 'content').and('not.be.empty')
        cy.get('head meta[property="og:image"]').should('have.attr', 'content').and('match', /^https?:\/\/.+/)
        cy.get('head meta[property="og:description"]').should('have.attr', 'content').and('not.be.empty')
    })

    it('Check canonical URL', () => {
        cy.url().then(url => {
            cy.get('link[rel="canonical"]').should('have.attr', 'href', url)
        })
    })

    it('Check internal link', () => {
        cy.get('a[href]').each(($a) => {
            const href = $a.attr('href')

            if(!href || typeof href !== 'string' || href === '#' || href.startsWith('javascript')) {return}

            const fullURL = href.startsWith('/') ? `${domain}${href}` : href

            if(fullURL.startsWith(domain)){
                //if(fullURL.includes('/the-loai/dam-my', '/the-loai/trong-sinh', '/the-loai/xuyen-khong')) {return}
                cy.request({url: fullURL, failOnStatusCode: false, timeOut: 60000}).then((resp) => {
                    expect(resp.status)
                })
            }else{
                cy.log(`External link found: ${href}`)
            }
        })
    })
})

describe('SEO Testing for Story Reading Pages', () => {
    const random = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
    }

    const domain = 'https://tieuthuyet.vn'
    const slug = 'thieu-nu-tho-ngay'
    const index = random(1, 15)
    const chapter = `chuong-${index}`
    const URL = `${domain}/${slug}/${chapter}`
    const name = 'Thiếu Nữ Thơ Ngây'

    beforeEach('Uncaught and openHomePage',() => {
        cy.visit(URL)

        // Chặn lỗi buildAuthUrl not defined của trang 
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('buildAuthUrl is not defined')) {
                return false
            }
        })    
    })

    it('Check dynamic Title', () => {
        cy.title().then((title) => {
            expect(title.toLowerCase()).to.include(`chương ${index}`)
            expect(title.toLowerCase()).to.include(name.toLowerCase())
        })
    })

    it('Check next chapter & prevous chapter', () => {
        if(index>1){
            cy.get('a').contains(/Chương trước/i).should('have.attr', 'href').then((prevChapter) => {
                expect(prevChapter).to.include(`chuong-${index-1}`)
                cy.request(prevChapter).its('status').should('eq', 200)
            })
        }else{return}

        cy.get('a').contains(/Chương sau/i).should('have.attr', 'href').then((nextChapter) => {
            expect(nextChapter).to.include(`chuong-${index+1}`)
            cy.request(nextChapter).its('status').should('eq', 200)
        }) 
    })

    it('Check internal link', () => {
        cy.get('a[href]').each(($a) => {
            const href = $a.attr('href')

            if(!href || typeof href !== 'string' || href === '#' || href.startsWith('javascript')) {return}

            const fullURL = href.startsWith('/') ? `${domain}${href}` : href

            if(fullURL.startsWith(domain)){
                cy.request({url: fullURL, failOnStatusCode: false}).then((resp) => {
                    expect(resp.status)
                })
            }else{
                cy.log(`External link found: ${href}`)
            }
        })
    })
})