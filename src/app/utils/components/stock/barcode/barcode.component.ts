import { Component, OnInit } from '@angular/core';
import { FetchUserTabDetailsService } from 'src/app/utils/services';
declare var JsBarcode: any;
import * as printJS from 'print-js';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {
  element: HTMLImageElement;
  constructor(private fetchBarcode: FetchUserTabDetailsService) { }

  ngOnInit() {
    //   let barCodeArray = [];
    //   this.http.getBarCode().subscribe(res => {
    //     barCodeArray = [];
    //     res.forEach(element => {
    //       barCodeArray.push(element);
    //     });
    //     const divCont = document.createElement('div');
    //     divCont.id = 'barCodeList';
    //     divCont.className = 'bar-code-name';
    //     document.body.appendChild(divCont);
    //     let moduolosOfBarcode = barCodeArray.length % 8;
    //     let checkTotalBarocdes = barCodeArray.length - moduolosOfBarcode;
    //     let totalPx: any;
    //     for (let index = 0; index < barCodeArray.length; index++) {
    //       const img1 = new Image();
    //       img1.id = `img-${index}`;
    //       img1.width = 335;
    //       img1.height = 120;
    //       const createdLetter = this.toLetters(index + 1);
    //       const divEle = document.createElement('div');
    //       divEle.className = 'ele-div';
    //       const spanEle = document.createElement('span');
    //       spanEle.className = 'letter-style';
    //       spanEle.innerHTML = createdLetter;
    //       let abc = document.createElement('div');
    //       if (index === checkTotalBarocdes) {
    //         totalPx = 140 * (8 - moduolosOfBarcode);
    //         abc.style.height = `${totalPx}px`;
    //         divEle.appendChild(abc)
    //       } else {

    //       }
    //       divEle.appendChild(spanEle);
    //       divEle.appendChild(img1);
    //       JsBarcode(img1, barCodeArray[index], {
    //         width: 2,
    //         fontSize: 14,
    //         height: 110,
    //         // marginLeft: 10,
    //       });
    //       divCont.appendChild(divEle);
    //     }
    //     // 
    //     setTimeout(() => {
    //       printJS({ printable: 'barCodeList', type: 'html', style: `.totalPx{position:absolute !important; bottom:50px;} .ele-div{width: 80% !important;  margin-bottom:11.3385826772px;} .letter-style{position:absolute !important; margin-top:100px; margin-left:10px; font-size:12px} .bar-code-name{height: fit-content !important}` });
    //       const y = document.getElementById('barCodeList');
    //       document.body.removeChild(y);
    //     }, 0);
    //   });
    // }

    // toLetters(num: number) {
    //   const mod = num % 26;
    //   let pow = num / 26 | 0;
    //   const out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    //   return pow ? this.toLetters(pow) + out : out;
    // }


    let barCodeArray = [];
    this.fetchBarcode.getBarCode().subscribe(res => {
      barCodeArray = [];
      if (res) {
        res.forEach(element => {
          barCodeArray.push(element);
        });
      } else {
        return
      }
      const divCont = document.createElement('div');
      divCont.id = 'barCodeList';
      divCont.className = 'bar-code-name';

      document.body.appendChild(divCont);
      let moduolosOfBarcode = barCodeArray.length % 10;
      let checkTotalBarocdes = barCodeArray.length - moduolosOfBarcode;
      let totalPx: any;
      for (let index = 0; index < barCodeArray.length; index++) {
        //outer div
        const BarcodeSvgImageContainer = document.createElement('div');
        BarcodeSvgImageContainer.className = 'ele-div';
        BarcodeSvgImageContainer.setAttribute('width', '288');
        BarcodeSvgImageContainer.setAttribute('height', '127');
        // BarcodeSvgImageContainer.setAttribute('height', '127');


        //svg
        const BarcodeSvgImage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        BarcodeSvgImage.id = `img-${index}`;
        BarcodeSvgImage.classList.add('barcode-size');
        BarcodeSvgImage.setAttribute('width', '200');
        // BarcodeSvgImage.setAttribute('height', '80');

        //to get A to Z
        const createdLetter = this.toLetters(index + 1);

        // span element to display alphabets
        const BarcodeContent = document.createElement('span');
        BarcodeContent.className = 'letter-style';

        BarcodeContent.innerHTML = createdLetter;
        BarcodeSvgImageContainer.appendChild(BarcodeContent);
        BarcodeSvgImageContainer.appendChild(BarcodeSvgImage);
        JsBarcode(BarcodeSvgImage)
          .options({
            font: 'OCR-B'
          }) // Will affect all barcodes
          .CODE128(barCodeArray[index], {
            height: 120,
            textPosition: 'bottom',
            fontSize: 15,
            margin: 10,
          })
          .render();
        divCont.appendChild(BarcodeSvgImageContainer);
      }

      setTimeout(() => {
        printJS({
          printable: 'barCodeList',
          type: 'html',
          targetStyles: ['*'],
          style: '.barcode-size{width: 53vw !important;}.ele-div{margin-left:20px !important;height:17.1vh !important;text-align:center! important}.letter-style{position:absolute !important; margin-top:11.5vh !important; margin-left:20px !important;z-index:1 !important; font-size:16px !important} .bar-code-name{height: fit-content !important}'
        });
        const y = document.getElementById('barCodeList');
        // document.body.removeChild(y);
      }, 0);
    });
  }

  toLetters(num: number) {
    const mod = num % 26;
    let pow = num / 26 | 0;
    const out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? this.toLetters(pow) + out : out;
  }
}
