import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import {sprintf} from "sprintf-js";

@Component({
  selector: 'app-nihii',
  templateUrl: './nihii.component.html',
  styleUrls: ['./nihii.component.scss']
})
export class NihiiComponent implements OnInit {
  private nihii11: any;
  private input: any;
  constructor() { }

  ngOnInit(): void {
    jQuery('input#nihii11').on('input', (evt)=>{
      this.input = jQuery(evt.currentTarget);
      this.nihii11 = this.input.val();

      if (this.nihii11?.length == 11 && this.nihii11?.match(/^\d+$/)) {
        const n = this.parseNihii(this.nihii11);
        this.display(n);
      }

    });
    jQuery('button#clear').on('click', (evt)=>{
      evt.preventDefault();
      this.display(null);
    });
    jQuery('button#generate').on('click', (evt)=>{
      evt.preventDefault();
      const number = parseInt(String(Math.random() * 999999));
      const possibleChecksums = [97, 89, 83, 79].map((m) => sprintf('%02d',m - (number % m)));
      const nihiiShort = sprintf('%06d', number).concat(possibleChecksums[parseInt(String(Math.random() * possibleChecksums.length))]);
      const qualification = sprintf('%03d', parseInt(String(Math.random() * 999)));
      const nihii = nihiiShort.concat(qualification);
      this.display(this.parseNihii(nihii));
    });
  }

  public display(nihiiObject: any) {
    if (nihiiObject == null) {
      jQuery('.form-group').removeClass('was-validated');
      jQuery('input#nihii11').val('');
      // @ts-ignore
      jQuery('input#nihii11').get(0).setCustomValidity('');
      jQuery('input#nihiiShort').val('');
      jQuery('input#checksum').val('');
    }
    else {
      jQuery('.form-group').addClass('was-validated');
      jQuery('input#nihii11').val(nihiiObject.nihii);
      jQuery('input#nihiiShort').val(nihiiObject.nihiiShort);
      jQuery('span#qualification').text(nihiiObject.qualification);
      jQuery('input#checksum').val(nihiiObject.checksum);
      jQuery('input#checksums').val(nihiiObject.validChecksums.join(', '));
      if (!nihiiObject.valid) {
        // @ts-ignore
        jQuery('input#nihii11').get(0).setCustomValidity('Invalid');
      }
      else {
        // @ts-ignore
        jQuery('input#nihii11').get(0).setCustomValidity('');
      }
    }
  }

  public parseNihii(nihiiString : string, options ?: any) {
    if (!options) {
      options = {};
    }
    if (!options.modulos) {
      options.modulos = [97, 89, 83, 79];
    }
    /*
      https://www.inami.fgov.be/fr/professionnels/autres/fournisseurs-logiciels/Pages/default.aspx#:~:text=Le%20num%C3%A9ro%20INAMI%20est%20une,unique%20qui%20distingue%20chaque%20dispensateur
      Dans cette formule :
      M = le nombre premier utilisé pour le calcul du modulo : 97, 89, 83 ou 79
      N = les 6 premiers chiffres du numéro INAMI : 000000 … 999999
      N mod M = le reste de la division entière de N par M
      C = le check-digit de ce numéro INAMI : 01..M (le check-digit est au minimum 01 et au maximum égal au modulo
      C = M – (N mod M)
     */
    let nihii: { valid: any; qualification: string; nihii: string; validChecksums: any; nihiiShort: string; checksum: number } = {
      nihii: nihiiString,
      nihiiShort: nihiiString,
      qualification: null,
      //number: null,
      checksum: null,
      validChecksums: null,
      valid: false
    };
    if (nihiiString.match(/^(\d{8})|(\d{11})$/)) {
      const n = parseInt(nihiiString.substring(0, 6));
      const validChecksums = options.modulos.map((m) => m - (n % m));
      const checksum = parseInt(nihiiString.substring(6, 8));
      let nihiiShort = nihiiString.match(/^\d{8}$/) ? nihiiString : nihiiString.substring(0,8);
      let qualification = nihiiString.match(/^\d{11}$/) ? nihiiString.substring(8,11) : null;
      nihii = {
        nihii: nihiiString,
        nihiiShort: nihiiShort,
        qualification: qualification,
        validChecksums: validChecksums,
        checksum: checksum,
        valid: validChecksums.find(c=> c === checksum)
      };
    }

    return nihii;
  }

}
