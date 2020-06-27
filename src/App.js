import React from 'react'
import './App.css'

class App extends React.Component {
    rightButtons = [
        { name: "+", value: null, type: "+" },
        { name: "-", value: null, type: "-" },
        { name: "*", value: null, type: "*" },
        { name: "/", value: null, type: "/" }
    ]

    leftButtons = [
        { name: "7", value: 7, type: "number" },
        { name: "8", value: 8, type: "number" },
        { name: "9", value: 9, type: "number" },
        { name: "4", value: 4, type: "number" },
        { name: "5", value: 5, type: "number" },
        { name: "6", value: 6, type: "number" },
        { name: "1", value: 1, type: "number" },
        { name: "2", value: 2, type: "number" },
        { name: "3", value: 3, type: "number" },
        { name: "0", value: 0, type: "number" },
        { name: "=", value: null, type: "equal" },
        { name: "C", value: null, type: "clear" }
    ]

    constructor(props) {
        super(props);
        this.state = {
            firstNumber: 0,
            secondNumber: 0,
            operator: null,
            position: 1,
            result: null
        }
    }


    handlerClick = (value, type) => {
        let firstNumber = this.state.firstNumber
        const secondNumber = this.state.secondNumber
        const operator = this.state.operator
        const position = this.state.position
        if (type === "number") {
            if (this.state.position === 1)
                this.setState({firstNumber: Number(`${firstNumber}${value}`)})
            else
                this.setState({secondNumber: Number(`${secondNumber}${value}`)})
            return
        }

        if (type === "equal") {
            if (position === 1)
                return

            let result = null

            switch(operator) {
                case "+":
                    result = firstNumber + secondNumber
                    break
                case "-":
                    result = firstNumber - secondNumber
                    break
                case "*":
                    result = firstNumber * secondNumber
                    break
                case "/":
                    result = firstNumber / secondNumber
                    break
            }
            this.setState({result})
        } else if (type === "clear") {
            this.setState({
                firstNumber: 0,
                secondNumber: 0,
                operator: null,
                position: 1,
                result: null
            })
        } else {
            if (position === 2) {

                switch(operator) {
                    case "+":
                        firstNumber = firstNumber + secondNumber
                        break
                    case "-":
                        firstNumber = firstNumber - secondNumber
                        break
                    case "*":
                        firstNumber = firstNumber * secondNumber
                        break
                    case "/":
                        firstNumber = firstNumber / secondNumber
                        break
                }
                this.setState({ operator: type, position: 2, firstNumber: firstNumber, secondNumber: 0 })
                return
            }

            this.setState({ operator: type, position: 2 })
        }
    }




    render() {
        return (
            <div className="app">
                <div className={"display"}>{this.state.result || this.state[this.state.position === 1 ? "firstNumber" : "secondNumber"]}</div>
                <div className={"buttons"}>
                    <div className={"left"}>
                        {this.leftButtons.map((item, index) => (
                            <button onClick={() => this.handlerClick(item.value, item.type)} className="left-item" key={index}>{item.name}</button>
                        ))}
                    </div>
                    <div className={"right"}>
                        {this.rightButtons.map((item, index) => (
                            <button onClick={() => this.handlerClick(null, item.type)} className={"right-item"} key={index}>{item.name}</button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default App
