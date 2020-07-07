import React from "react";
import classes from "./index.module.css";
import { getBounding } from "../utils/getBounding";

export class RangePicker extends React.Component {
	constructor(props) {
		super(props);

		const { from = new Date() } = props;

		this.state = {
			showDateFrom: from,
			bounding: {
				top: 0,
				left: 0,
			},
			thistarget: {},
		};

		document.addEventListener("click", this.onClose, true);
	}

	get year() {
		return this.state.showDateFrom.toLocaleString("ru", { year: "numeric" });
	}

	componentDidMount() {
		
		/* const { top, left } = getBounding(
			this.props.target,
			document.querySelector(`.${classes.rangepicker}`)
		);

		this.setState({
			bounding: {
				top,
				left,
			},
		}); */
	}

	/* componentDidUpdate(prevProps, prevState) {
		console.log(prevProps, prevState);
	} */

	/* componentReceiveProps(nextProps, nextContext) {
		console.log(nextProps, nextContext);
	} */

	onNext = () => {
		this.setState({
			showDateFrom: this.nextMonth(this.state.showDateFrom),
		});
	};
	onPrev = () => {
		this.setState({
			showDateFrom: this.prevMonth(this.state.showDateFrom),
		});
	};

	onClose = ({ target }) => {
		if (!target.closest(`.${classes.rangepicker}`)) {
			if (!this.to) {
				/* this.$emit('update:to', this.from);
				this.$emit('onRangeSelected', { from: this.from, to: this.to }); */
			}
			this.props.onClose();
		}
	};

	nextMonth(date) {
		return new Date(date.getFullYear(), date.getMonth() + 1, 1);
	}

	prevMonth(date) {
		return new Date(date.getFullYear(), date.getMonth() - 1, 1);
	}

	render() {
		console.log(this.props);
		console.log(document.querySelector(`.${classes.rangepicker}`));
		let cls = [classes.rangepicker];
		if (this.props.isOpen) {
			cls.push(classes.rangepicker__open);
		}

		return (
			<div
				className={cls.join(" ")}
				style={{
					left: this.state.bounding.left,
					right: this.state.bounding.right,
				}}
			>
				<div className={classes["rangepicker__selector"]}>
					<div
						className={classes["rangepicker__selector-control-left"]}
						onClick={this.onPrev}
					></div>
					<div
						className={classes["rangepicker__selector-control-right"]}
						onClick={this.onNext}
					></div>

					<div className={classes["rangepicker_year"]}>{this.year} год</div>

					{/* <div class="rangepicker_calendar">
				<Calendar :date="showDateFrom" :from="from" :to="to" @onSetDay="onSetDay" />
				<Calendar
					:date="nextMonth(showDateFrom)"
					:from="from"
					:to="to"
					@onSetDay="onSetDay"
				/>
			</div> */}
				</div>
			</div>
		);
	}
}
