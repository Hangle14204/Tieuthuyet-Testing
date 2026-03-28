describe('Register Testing', () => {

    beforeEach('Uncaught and open RegisterPage',() => {
        cy.visit('https://tieuthuyet.vn/dang-ky')
        cy.url().should('include', 'tieuthuyet.vn/dang-ky')

        // Chặn lỗi buildAuthUrl not defined của trang 
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('buildAuthUrl is not defined')) {
                return false
            }
        })    
    })

    it("R01, Register with valid information", () => {
        cy.get("input[placeholder='Nhập tên thành viên']").clear().type('Vy Thanh')
        cy.get("input[placeholder='Nhập email thành viên']").clear().type('vythanh247@gmail.com')
        cy.get("input[placeholder='Tối thiểu 8 ký tự, bao gồm chữ hoa, thường và số']").clear().type('Vythanh247')
        cy.get("input[placeholder='Nhập lại mật khẩu']").clear().type('Vythanh247')
        cy.get("button[class='btn btn-primary']").click()

        cy.get("div.alert-success").should('be.visible').and('contain text', 'Tạo tài khoản thành công!')
    })

    it("R02, Register with an email address you are already using", () => {
        cy.get("input[placeholder='Nhập tên thành viên']").clear().type('Vy Thanh')
        cy.get("input[placeholder='Nhập email thành viên']").clear().type('vythanh247@gmail.com')
        cy.get("input[placeholder='Tối thiểu 8 ký tự, bao gồm chữ hoa, thường và số']").clear().type('Vythanh247')
        cy.get("input[placeholder='Nhập lại mật khẩu']").clear().type('Vythanh247')
        cy.get("button[class='btn btn-primary']").click()

        cy.get("div.alert-danger").should('be.visible').and('contain text', 'Email này đã được sử dụng')
    })

    it("R03, Register with an email leave the inform field blank", () => {
        cy.get("input[placeholder='Nhập tên thành viên']").clear().type('Vy Thanh')
        cy.get("input[placeholder='Nhập email thành viên']").clear()
        cy.get("input[placeholder='Tối thiểu 8 ký tự, bao gồm chữ hoa, thường và số']").clear().type('Vythanh247')
        cy.get("input[placeholder='Nhập lại mật khẩu']").clear().type('Vythanh247')
        cy.get("button[class='btn btn-primary']").click()

        cy.get("div.alert-danger").should('exist')
    })

    it("R04, Register with an email leave the inform field blank", () => {
        cy.get("input[placeholder='Nhập tên thành viên']").clear().type('Thanh Vy')
        cy.get("input[placeholder='Nhập email thành viên']").clear().type('ThanhVy247@gmail.com')
        cy.get("input[placeholder='Tối thiểu 8 ký tự, bao gồm chữ hoa, thường và số']").clear().type('Thanhvy247')
        cy.get("input[placeholder='Nhập lại mật khẩu']").clear().type('Vythanh247')
        cy.get("button[class='btn btn-primary']").click()

        cy.get("div.alert-danger").should('exist')
    })

})

describe('Login Testing', () => {

    beforeEach('Uncaught and open LoginPage',() => {
        cy.visit('https://tieuthuyet.vn/login')
        cy.url().should('include', 'tieuthuyet.vn/login')

        // Chặn lỗi buildAuthUrl not defined của trang 
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('buildAuthUrl is not defined')) {
                return false
            }
        })    
    })

    it("L01, Login with valid information", () => {
        cy.get("input[name='email']").clear().type('vythanh247@gmail.com')
        cy.get("input[name='password']").clear().type('Vythanh247')
        cy.get("button[class='btn btn-primary']").click()

        cy.url().should('include', 'tieuthuyet.vn')
        cy.get(".dropdown.user.user-menu").should('be.visible').and('contain text', 'Vy Thanh')
    })

    it("L02, Login with invalid email", () => {
        cy.get("input[name='email']").clear().type('invalid@gmail.com')
        cy.get("input[name='password']").clear().type('Vythanh247') 
        cy.get("button[class='btn btn-primary']").click()

        cy.get("span[class='help-block'] strong").should('be.visible').and('contain text', 'These credentials do not match our records.')
    })

    it("L03, Login with invalid password", () => {
        cy.get("input[name='email']").clear().type('vythanh247@gmail.com')
        cy.get("input[name='password']").clear().type('InvalidPassword') 
        cy.get("button[class='btn btn-primary']").click()

        cy.get("span[class='help-block'] strong").should('be.visible').and('contain text', 'These credentials do not match our records.')
    })

})