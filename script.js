class Calculator {
    constructor(operand) {
        this.previousOperandTextElement = ''
        this.currentOperandTextElement = operand
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation, operationHTMLinfo) {
        if (this.currentOperand === '' && this.previousOperand === '') return
        if (this.currentOperand === '' && this.previousOperand !== '' && this.operation !== undefined) {
            this.operationHTMLinfo.classList.remove('active-operation')
            this.operationHTMLinfo.classList.add('orange')
            this.operation = operation
            this.operationHTMLinfo = operationHTMLinfo
            this.operationHTMLinfo.classList.add('active-operation')
            this.operationHTMLinfo.classList.remove('orange')
            return
        }
        if (operation === '%') {
            this.currentOperand /= 100
            this.updateDisplay()
            return
        }
        if (operation === '+/-') {
            this.currentOperand *= -1
            this.updateDisplay()
            return
        }
        else if (this.previousOperand !== '') {
            this.compute()
            this.updateDisplay()
        }
        else {
            this.operation = operation
            this.operationHTMLinfo = operationHTMLinfo
            this.operationHTMLinfo.classList.add('active-operation')
            this.operationHTMLinfo.classList.remove('orange')
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
        }
    }

    compute() {
        const prevValue = parseFloat(this.previousOperand)
        const currValue = parseFloat(this.currentOperand)
        let computation
        if (isNaN(prevValue) || isNaN(currValue)) return
        switch (this.operation) {
            case '+':
                computation = prevValue + currValue
                break
            case '-':
                computation = prevValue - currValue
                break
            case '×':
                computation = prevValue * currValue
                break
            case '÷':
                computation = prevValue / currValue
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    DisplayNumber(number) {
        const entireNumber = number.toString()
        const integerDigits = parseFloat(entireNumber.split('.')[0])
        const decimalDigits = entireNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.DisplayNumber(this.currentOperand)
        if (this.operation === undefined) {
            this.operationHTMLinfo.classList.remove('active-operation')
            this.operationHTMLinfo.classList.add('orange')
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const clearButton = document.querySelector('[data-clear]')
const equalButton = document.querySelector('[data-equals]')
const operand = document.querySelector('[data-operand]')

const calculator = new Calculator(operand)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText, button)
    })
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})