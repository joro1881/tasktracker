describe('TaskTracker app end to end testing', () => {
  it('Visits the app root url', () => {
    // cy.server()
    // cy.route('GET', '**/api/tasks', 'fixture:test.db.json')
    // cy.route('POST', '**/api/tasks', 'fixture:test.db.json')
    cy.visit('/task-tracker')
    cy.contains('h1', 'Task Tracker')
  })

  it('Access app, check add/remove task btn and fields', () => {
    cy.get('button', { class: 'green-btn btn' }).click()
    cy.get('form').get('input[name="text"]').should('exist')
    cy.get('form').get('input[name="day"]').should('exist')
    cy.get('form').get('input[name="reminder"]').should('exist')

    cy.get('button', { class: 'red-btn btn' }).click()
    cy.get('input[name="text"]').should('not.exist')
    cy.get('input[name="day"]').should('not.exist')
    cy.get('input[name="reminder"]').should('not.exist')
  })

  it('add a task with empty fields triggers alert', () => {
    cy.get('button', { class: 'green-btn btn' }).click()
    cy.get('input[type=submit]').click()
    cy.on('window:alert', (msg) => {
      expect(msg).contains('Please add a task')
    })
    // reset form
    cy.get('button', { class: 'red-btn btn' }).click()

    // cypress detects and checks the alert however still submits element!?
    cy.get('i', { class: 'fas fa-times' }).last().click()
  })

  it('Adds a task with reminder and without reminder', () => {
    cy.get('.task-reminder.task').its('length').should('eq', 3)

    // add new task with reminder
    cy.get('button', { class: 'green-btn btn' }).click()
    cy.get('input[name="text"]').type('ExampleTest')
    cy.get('input[name="day"]').type('Awesome test day')
    cy.get('input[name="reminder"]').check()
    cy.get('input[type=submit]').click()

    cy.get('.task-reminder.task').its('length').should('eq', 4)

    // add new task without reminder save it
    cy.get('input[name="text"]').type('ExampleTest2')
    cy.get('input[name="day"]').type('Awesome test2 day')
    cy.get('input[type="checkbox"]').uncheck()
    cy.get('input[type=submit]').click()

    cy.get('.task-reminder.task').its('length').should('eq', 4)
    cy.get('.task').its('length').should('eq', 5)
  })

  it('delete a task successfully', () => {
    cy.get('.task').its('length').should('eq', 5)
    cy.get('i', { class: 'fas fa-times' }).last().click()
    cy.get('.task').its('length').should('eq', 4)

    // reset previous test
    cy.get('i', { class: 'fas fa-times' }).last().click()
  })

  // it('delete a task generates error message', () => {
  //   // check how many tasks
  //   // delete a non existing task
  //   // check message
  // })

  it('reminds work by dblclick, add and remove reminder on exact task', () => {
    cy.get('.task-reminder.task').its('length').should('eq', 3)
    cy.get('.task-reminder.task').last().dblclick()
    cy.get('.task-reminder.task').its('length').should('eq', 2)

    // // dbclcik on same task, returns reminder previous state
    cy.get('.task').last().dblclick()
    cy.get('.task-reminder.task').its('length').should('eq', 3)
  })
})
