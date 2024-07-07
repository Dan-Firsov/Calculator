const input = document.querySelector(".cal__input")
const buttons = document.querySelectorAll(".cal__buttons")

let firstNum = null
let secondNum = null
let screenNum = null
let operat = null
let result = null
let lastOperat = null

input.addEventListener("keydown", function (event) {
  let key = event.key
  let eventValue = event.target.value
  if (!/[\d\.\-]/.test(key) && key !== "Backspace") {
    event.preventDefault()
  }
  if ((key === "-" && eventValue.includes("-")) || (key === "." && eventValue.includes("."))) {
    event.preventDefault()
  }
  if (key === "-" && eventValue.length) {
    event.preventDefault()
  }
  if (key === "." && !eventValue.length) {
    event.preventDefault()
  }
  if (key === "+") {
    setOperation("+")
  }
  if (key === "-") {
    setOperation("-")
  }
  if (key === "*") {
    setOperation("*")
  }
  if (key === "/") {
    setOperation("/")
  }
  if (key === "Enter") {
    Equals()
  }
})

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    switch (button.id) {
      case "Backspace":
        input.value = input.value.slice(0, -1)
        break
      case "ClearAll":
        if (!input.value) {
          firstNum = secondNum = operat = lastOperat = result = null
          break
        }
        input.value = ""
        break
      case "dot":
        if (!input.value.includes(".")) {
          input.value += "."
        }
        break
      case "min":
        if (input.value == "") {
          input.value = "-"
        } else {
          setOperation("-")
        }
        break
      case "plus":
        setOperation("+")
        break
      case "mul":
        setOperation("*")
        break
      case "div":
        setOperation("/")
        break
      case "eq":
        Equals()
        break
      default:
        input.value += button.value
    }
  })
})

function setOperation(operator) {
  if (input.value !== "") {
    if (firstNum === null) {
      firstNum = parseFloat(input.value)
    } else if (operat) {
      secondNum = parseFloat(input.value)
      calculate()
      firstNum = result
    }
  }
  operat = operator
  input.value = ""
}

function calculate() {
  switch (operat) {
    case "+":
      result = firstNum + secondNum
      break
    case "-":
      result = firstNum - secondNum
      break
    case "*":
      result = firstNum * secondNum
      break
    case "/":
      result = firstNum / secondNum
      break
    default:
      return
  }
}

function Equals() {
  if (input.value === "" && result !== null) {
    firstNum = result
    operat = lastOperat
  } else {
    if (firstNum === null || operat === null) {
      return
    }

    screenNum = input.value
    secondNum = parseFloat(screenNum)
  }

  calculate()
  input.value = result.toString()

  lastOperat = operat
  firstNum = result
  operat = null
}
