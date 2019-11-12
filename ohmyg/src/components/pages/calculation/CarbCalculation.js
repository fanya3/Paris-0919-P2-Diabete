import React from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './CarbCalculation.css';
import InsulinCalculation from "./InsulinCalculation";
// import icon from "../../../assets/icons/checked.png";
import bin from "../../../assets/icons/trash.png"

class CarbCalculation extends React.Component {
    state = {
        name: "",
        carb100g: 25,
        value: 100,
        carbRatio: 0,
        totalCarb: 0,
        galleryItems: [],
        calculationButtonIsClicked: false,
        modifyingItem: false,
    }


    newFood = () => {
        this.setState({ value: 100 })
        this.setState({ name: this.props.newName })
        this.setState({ carb100g: this.props.newCarbs })
    }

    componentDidUpdate() {
        if (this.state.modifyingItem === false) {
            if (this.state.name !== this.props.newName || this.state.carb100g !== this.props.newCarbs) {
                this.newFood()
            }
        }
    }


    responsive = {
        0: { items: 1 },
        1024: { items: 2 },
    }

    onSlideChange = (e) => {
        console.debug('Item`s position during a change: ', e.item)
        console.debug('Slide`s position during a change: ', e.slide)
    }

    onSlideChanged = (e) => {
        console.debug('Item`s position after changes: ', e.item)
        console.debug('Slide`s position after changes: ', e.slide)
    }

    handleChange = (event) => {
        if (event.target.value > 500) {
            return;
        }
        this.setState({ value: event.target.value });
    }


    /* Boutons à modifier pour Charlotte : */

    /* bouton validation */

    handleClick = async () => {
        if (this.state.modifyingItem === false && this.state.name !== "") {

            let carbRatioItem = (this.state.carb100g * this.state.value / 100).toFixed(2)
            this.setState({ carbRatio: carbRatioItem }, async () => {
                let objectName = this.state.name;
                let objectCarbRatio = this.state.carbRatio;
                let objectValue = this.state.value;
                let objectCarb100 = this.state.carb100g

                const tab = [...this.state.galleryItems, { dish: objectName, dishCarb: objectCarbRatio, dishWeight: objectValue, dishCarb100: objectCarb100 }]
                await this.setState({ galleryItems: tab })
            })
            const result = await parseFloat(this.state.totalCarb) + parseFloat(this.state.carbRatio)

            await this.setState({ totalCarb: result.toFixed(2) })
            this.setState({ value: 100 })
            this.setState({ name: "" })
        }

        /* c'est dans le if ci-dessous, donc si on est en mode "modification", qu'il faut que les nouvelles valeurs du state remplacent celles de l'élément dans le tableau (avec un .find je pensais mais tu fais comme tu trouves) */

        if (this.state.modifyingItem === true) {

            this.setState({ modifyingItem: false })
        }


    }

    /* Bouton poubelle */

    deleteItem = () => {
        this.setState({ modifyingItem: false })
    }

    /* fin des boutons à modifier */



    calculationButton = () => {
        this.setState({ calculationButtonIsClicked: true })
    }

    modifyItem = async (elem) => {
        await this.setState({ modifyingItem: true })
        this.setState({ name: elem.dish })
        this.setState({ value: elem.dishWeight })
        this.setState({ carb100g: elem.dishCarb100 })
    }


    render() {
        let carbRatio = (this.state.carb100g * this.state.value / 100).toFixed(2)
        const weight = this.state.value
        const ratio = 100 / this.state.carb100g
        let carbRatio2 = (weight / ratio).toFixed(2)

        console.log(this.state.galleryItems)
        console.log(this.state.modifyingItem)

        return (
            <div className="range">
                <div className='blockFoodWeight'>

                    <h2 className='carbCalculation-h2'> {this.state.name} : </h2>
                    <div className="InputRangeTest">
                        <InputRange
                            className="input-range"
                            step={0.5}
                            maxValue={300}
                            minValue={0}
                            value={this.state.value}
                            onChange={value => this.setState({ value })} />
                    </div>

                    <div className='inputWeightCarbo'>
                        <div className='inputWeight'>
                            <label className='carbCalculation-label'>Poids </label>
                            <div className='borderInputLabel'>
                                <input
                                    className="foodWeight"
                                    type='number'
                                    maxValue={500}
                                    value={this.state.value}
                                    onChange={this.handleChange} />
                                <label className='carbCalculation-label'> g</label>
                            </div>
                        </div>
                        <div className='inputCarbo'>
                            <label className='carbCalculation-label'>Glucides </label>
                            <div className='borderInputLabel'>
                                <input
                                    className="carbohydrate"
                                    type="number"
                                    value={this.state.modifyingItem ? carbRatio2 : carbRatio}
                                />
                                <label className='carbCalculation-label'> g</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="CarbCalculation-buttonContainer">
                    <div className="CarbButtons">
                        <button className="CarbCalculation-Validation"
                            onClick={this.handleClick}>
                            <div className="Button-Border"></div>
                            {/* <img className="Button-Icon-Checked" src={icon} /> */}
                        </button>
                        
                        {this.state.modifyingItem ?
                            <button onClick={this.deleteItem}
                                className="CarbCalculation-Validation bin">
                                <div className="Button-Border"></div>
                                <img className="Button-Icon-Checked" src={bin} />
                            </button> : ""}


                    </div>
                </div>


                <div className='carbCalculation-totalCarousel'>
                    <div className='carbCalculation-addition'>
                        <p className='carbCalculation-p'>{this.state.totalCarb} g</p>
                    </div>


                    <div className='carbs-list'>
                        {this.state.galleryItems.map(elem =>
                            <ul className="carbCalculation-ul" onClick={() => this.modifyItem(elem)} >
                                <div className="carbCalculation-liItem">
                                    <li> {elem.dish}</li>
                                    <li> {elem.dishCarb}</li>
                                </div>
                            </ul>)}
                    </div>
                </div>
                <div className="meal-CalculationButton">
                    <button onClick={this.calculationButton}>Calculation</button>

                </div>
                {this.state.calculationButtonIsClicked ? <InsulinCalculation carbs={this.state.totalCarb} /> : ""}

            </div>
        );
    }
}

export default CarbCalculation