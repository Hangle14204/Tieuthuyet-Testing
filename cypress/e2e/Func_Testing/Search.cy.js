describe('Search Testing', () => {

    beforeEach('Uncaught and open HomePage',() => {
        cy.visit('https://tieuthuyet.vn/')
        cy.url().should('include', 'tieuthuyet.vn')

    // Bỏ lỗi js
        Cypress.on('uncaught:exception', () => false)   

        // Chặn lỗi buildAuthUrl not defined của trang 
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('buildAuthUrl is not defined')) {
                return false
            }
        })    
    })

    it("S01, Search with exact keyword", () => {
        const key ='Yêu em từ cái nhìn đầu tiên'

        cy.get("input[placeholder='Nhập từ khóa...']").clear().type(`${key}{enter}`)
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)

        cy.get('#truyen-slide .caption h3')
            .eq(1) // cái thứ 2 mới có text
            .invoke('text')
            .then((text) => {
                expect(text.trim().toLowerCase()).to.include(key.toLowerCase())
            })
    })

    it("S02, Search with keywords similar to the story's name", () => {
        const key ='Yêu em từ cái nhìn đầu tiên'

        cy.get("input[placeholder='Nhập từ khóa...']").clear().type('Yêu em từ ánh nhìn đầu tiên{enter}')
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)

        cy.get('#truyen-slide .caption h3')
            .eq(1)
            .invoke('text')
            .then((text) => {
                expect(text.trim().toLowerCase()).to.include(key.toLowerCase())
            })
    })

    it("S03, Search with keywords that contain part of the story's name", () => {
        const key ='Yêu em từ cái nhìn đầu tiên'

        cy.get("input[placeholder='Nhập từ khóa...']").clear().type('từ cái nhìn đầu tiên{enter}')
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)

        cy.get('#truyen-slide .caption h3')
            .eq(1)
            .invoke('text')
            .then((text) => {
                expect(text.trim().toLowerCase()).to.include(key.toLowerCase())
            })
    })

    it("S04, Search with unaccented keywords", () => {
        const key = 'Yêu em từ cái nhìn đầu tiên'

        cy.get("input[placeholder='Nhập từ khóa...']").clear().type('Yeu em tu cai nhin dau tien{enter}')
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)

        cy.get('#truyen-slide .caption h3')
            .eq(1)
            .invoke('text')
            .then((text) => {
                expect(text.trim().toLowerCase()).to.include(key.toLowerCase())
            })
    })

    it("S05, Search with a keyword containing one letter", () => {
        cy.get("input[placeholder='Nhập từ khóa...']").clear().type('Y{enter}')
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)
    })

    it("S06, Search with keywords repeat word", () => {
        const key = 'Yêu em từ cái nhìn đầu tiên'

        cy.get("input[placeholder='Nhập từ khóa...']").clear().type('Yêu em từ từ ánh nhìn đầu tiên{enter}')
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)

        cy.get('#truyen-slide .caption h3')
            .eq(1)
            .invoke('text')
            .then((text) => {
                expect(text.trim().toLowerCase()).to.include(key.toLowerCase())
            })
    })

    it("S07, Search using keywords: story's name along with author", () => {
        const key = 'Yêu em từ cái nhìn đầu tiên'

        cy.get("input[placeholder='Nhập từ khóa...']").clear().type('Yêu em từ từ ánh nhìn đầu tiên Cố Mạn').type('{enter}')
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)

        cy.get('#truyen-slide .caption h3')
            .eq(1)
            .invoke('text')
            .then((text) => {
                expect(text.trim().toLowerCase()).to.include(key.toLowerCase())
            })
    })

    it("S08, Search for story by author name", () => {
        cy.get("input[placeholder='Nhập từ khóa...']").clear().type('Cố Mạn{enter}')
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)
    })

    it("S09, Search for story by category", () => {
        cy.get("input[placeholder='Nhập từ khóa...']").clear().type('Ngôn tình')
        cy.get('select[name="type"]').select('category').type('{enter}')
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)
    })

    it("S10, Search using keywords containing special characters found in the story's name", () => {
        const key = 'Quỷ đế cuồng thê: Đại tiểu thư ăn chơi trác táng'

        cy.get("input[placeholder='Nhập từ khóa...']").clear().type(`${key}{enter}`)
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)

        cy.get('#truyen-slide .caption h3')
            .eq(1)
            .invoke('text')
            .then((text) => {
                expect(text.trim().toLowerCase()).to.include(key.toLowerCase())
            })
    })

    it("S11, Search using keywords containing special characters not found in the story's name", () => {
        const key = 'Quỷ đế cuồng thê: Đại tiểu thư ăn chơi trác táng'

        cy.get("input[placeholder='Nhập từ khóa...']").clear().type('Quỷ đế cuồng thê, đại tiểu thư ăn chơi trác táng{enter}')
        cy.get('#truyen-slide .row > div').should('have.length.greaterThan', 0)

        cy.get('#truyen-slide .caption h3')
            .eq(1)
            .invoke('text')
            .then((text) => {
                expect(text.trim().toLowerCase()).to.include(key.toLowerCase())
            })
    })
}) 