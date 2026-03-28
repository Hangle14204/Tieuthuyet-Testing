describe('Deposit gold via bank Testing', () => {

    beforeEach('Uncaught and open RegisterPage',() => {
        // Chặn lỗi buildAuthUrl not defined của trang 
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('buildAuthUrl is not defined')) {
                return false
            }
        })   

        cy.session('Login and navigate to deposit page', () => {
            cy.visit('https://tieuthuyet.vn/login')
            cy.get("input[name='email']").clear().type('vythanh247@gmail.com')
            cy.get("input[name='password']").clear().type('Vythanh247')
            cy.get("button[class='btn btn-primary']").click()

            cy.url().should('include', 'tieuthuyet.vn')
            cy.get(".dropdown.user.user-menu").should('be.visible').and('contain text', 'Vy Thanh')

            cy.get(".dropdown.user.user-menu").click()
            cy.get(".hidden-xs.btn.btn-default.btn-flat").click()
            cy.get("a[href='https://tieuthuyet.vn/dashboard/deposit']").click()
        })     
    })

    it("AC01, Enter a valid amount", () => {
        const amount = '1000000'
        const expectedGold = amount * 0.85

        cy.get("#amount").clear().type(amount)
        cy.get("#gold_receive").invoke('val').then((value) => {const gold = Number(value.replace(/\./g, '')) 
            expect(gold).to.eq(expectedGold)
        })

    })

    it("AC02, Enter a invalid amount", () => {
        cy.get("#amount").clear().type(50000)
        cy.get("#gold_receive").should('contain text', 'Không hợp lệ')
    })

    it("AC03, No payment method selected", () => {
        cy.get("#amount").clear().type(100000)
        cy.get("#method").should('contain text', 'Không có đại lý phù hợp')
    })

    it("AC04, The gold dealer has not selected", () => {
        cy.get("method").select('Ngân hàng')
        cy.get("nextStep").click()

        cy.on('window:alert', (text) => {
            expect(text).to.contains('Không tìm thấy đại lý.')
        })

    })

    it("A05, Enter special characters in the Amount field", () => {
        cy.get("#amount").clear().type('numb')
        cy.get("#gold_receive").should('contain text', 'Không hợp lệ')
    })    
})

describe('Deposit gold via scratch cards Testing', () => {

    beforeEach('Uncaught and open RegisterPage',() => {
        // Chặn lỗi buildAuthUrl not defined của trang 
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('buildAuthUrl is not defined')) {
                return false
            }
        })   

        cy.session('Login and navigate to deposit card page', () => {
            cy.visit('https://tieuthuyet.vn/login')
            cy.get("input[name='email']").clear().type('vythanh247@gmail.com')
            cy.get("input[name='password']").clear().type('Vythanh247')
            cy.get("button[class='btn btn-primary']").click()

            cy.url().should('include', 'tieuthuyet.vn')
            cy.get(".dropdown.user.user-menu").should('be.visible').and('contain text', 'Vy Thanh')

            cy.get(".dropdown.user.user-menu").click()
            cy.get(".hidden-xs.btn.btn-default.btn-flat").click()
            cy.get("a[href='https://tieuthuyet.vn/dashboard/deposit-card']").click()

            cy.get("#agreeTermsBtn").click()
        })
    })

    it("AC06, Gold top-up via scratch card successful.", () => {
        cy.get("select[name='telco']").select('Viettel')
        cy.get("select[name='amount']").select('50,000 VNĐ - Nhận 35,000 Vàng')
        cy.get("input[placeholder='Nhập mã thẻ']").type('0202865478593')
        cy.get("input[placeholder='Nhập số seri']").type('20000306613038')
        cy.get("button[class='btn btn-success']").click()

        cy.on('window:alert', (text) =>{
            expect(text).to.contains('Thẻ đã gửi, vui lòng chờ xử lý trong 15s–1p. Bạn có thể theo dõi trạng thái thẻ ở tab Lịch sử nạp.')
        })
    })

    it("AC07, Leave the serial number field blank", () => {
        cy.get("select[name='telco']").select('Viettel')
        cy.get("select[name='amount']").select('50,000 VNĐ - Nhận 35,000 Vàng')
        cy.get("input[placeholder='Nhập mã thẻ']").type('0202865478593')
        cy.get("button[class='btn btn-success']").click()

        cy.get("input[placeholder='Nhập số seri']").then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })

    it("AC08, Leave the code field blank", () => {
        cy.get("select[name='telco']").select('Viettel')
        cy.get("select[name='amount']").select('50,000 VNĐ - Nhận 35,000 Vàng')
        cy.get("input[placeholder='Nhập số seri']").type('20000306613038')
        cy.get("button[class='btn btn-success']").click()

        cy.get("input[placeholder='Nhập mã thẻ']").then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })

    it("AC09, Ain't select a network provider", () => {
        cy.get("select[name='amount']").select('50,000 VNĐ - Nhận 35,000 Vàng')
        cy.get("input[placeholder='Nhập mã thẻ']").type('0202865478593')
        cy.get("input[placeholder='Nhập số seri']").type('20000306613038')
        cy.get("button[class='btn btn-success']").click()

        cy.get("select[name='telco']").then(($input) => {
            expect($input[0].validationMessage).to.eq('Please select an item in the list.')
        })
    })

    it("AC10, Ain't select the card denomination", () => {
        cy.get("select[name='telco']").select('Viettel')
        cy.get("input[placeholder='Nhập mã thẻ']").type('0202865478593')
        cy.get("input[placeholder='Nhập số seri']").type('20000306613038')
        cy.get("button[class='btn btn-success']").click()

        cy.get("select[name='amount']").then(($input) => {
            expect($input[0].validationMessage).to.eq('Please select an item in the list.')
        })
    })  
})