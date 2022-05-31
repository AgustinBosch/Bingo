import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
	row: number = 3;
	col: number = 9;
	bingo: number[][] = [];
	delayms: number = 100;
	title = "bingo";

	ngOnInit() {
		this.generateBingoEmpty();
	}

	generateBingoEmpty() {
		for (let i = 0; i < this.row; i++) {
			this.bingo[i] = [];
			for (let j = 0; j < this.col; j++) {
				this.bingo[i][j] = 0;
			}
		}
	}

	increaseDelay() {
		if (this.delayms < 10000) {
			this.delayms += 100;
		}
	}

	decreaseDelay() {
		if (this.delayms > 100) {
			this.delayms -= 100;
		}
	}

	async fillBingo(delay: boolean) {
		for (let i = 0; i < this.row; i++) {
			for (let j = 0; j < this.col; j++) {
				while (true) {
					let randmin = j * 10;
					let randmax = (j + 1) * 10;
					let number;
					if (j == 0) {
						randmin++;
					} else if (j == 8) {
						randmax++;
					}
					number = Math.floor(
						Math.random() * (randmax - randmin) + randmin
					);
					let repetido = false;
					for (let k = 0; k < this.row; k++) {
						if (this.bingo[k][j] == number) {
							repetido = true;
						}
					}
					if (!repetido) {
						this.bingo[i][j] = number;
						if (delay) {
							await this.delayuwu(this.delayms);
						}
						break;
					}
				}
			}
		}
		for (let j = 0; j < this.col; j++) {
			let sorted = false;
			while (!sorted) {
				sorted = true;
				for (let i = 0; i < this.row - 1; i++) {
					if (this.bingo[i][j] > this.bingo[i + 1][j]) {
						if (delay) {
							await this.delayuwu(this.delayms);
						}
						let temp = this.bingo[i + 1][j];
						this.bingo[i + 1][j] = this.bingo[i][j];
						this.bingo[i][j] = temp;
						sorted = false;
					}
				}
			}
		}
		await this.fillBlanks(delay);
	}

	async fillBlanks(delay: boolean) {
		let blanks = 12;

		for (let i = 0; i < blanks; i++) {
			while (true) {
				let col = Math.floor(Math.random() * 9);
				let row = Math.floor(Math.random() * 3);
				if (this.validBlank(row, col)) {
					if (delay) {
						await this.delayuwu(this.delayms);
					}
					this.bingo[row][col] = 0;
					break;
				}
			}
		}
	}

	validBlank(row: number, col: number) {
		let blanksInRow = 0;
		let blanksInCol = 0;
		if (this.bingo[row][col] == 0) {
			return false;
		}
		for (let i = 0; i < this.row; i++) {
			if (this.bingo[i][col] == 0) {
				blanksInCol++;
			}
		}
		for (let j = 0; j < this.col; j++) {
			if (this.bingo[row][j] == 0) {
				blanksInRow++;
			}
		}
		if (
			(blanksInCol == 0 && blanksInRow < 3) ||
			(blanksInCol == 1 && blanksInRow == 3)
		) {
			return true;
		} else {
			return false;
		}
	}

	delayuwu(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
