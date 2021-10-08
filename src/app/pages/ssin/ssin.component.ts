// @ts-ignore

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as jQuery from 'jquery';
import {sprintf} from "sprintf-js";

@Component({
  selector: 'app-ssin',
  templateUrl: './ssin.component.html',
  styleUrls: ['./ssin.component.scss']
})
export class SsinComponent implements OnInit {
  private input: any;
  private ssin: any;

  constructor() { }

  ngOnInit(): void {

    jQuery('input#ssin').on('input', (evt) => {
      this.input = jQuery(evt.currentTarget);
      this.ssin = this.input.val();
      if (this.ssin.length >= 11) {
        this.input.parents('.form-group').addClass('was-validated');
        jQuery('input#suffix').parents('.form-group').addClass('was-validated');
      }
      const ssinObject = this.parseSsin(this.ssin);
      if (ssinObject.isValid) {
        this.input.get(0).setCustomValidity('');
        // @ts-ignore
        jQuery('input#birthdate').val(ssinObject.birthdate.format('YYYY-MM-DD'));
        // @ts-ignore
        jQuery('input#number').val(sprintf('%03d', ssinObject.number));
        // @ts-ignore
        jQuery('span#sex').html((ssinObject.number % 2 == 0) ? '<i class="fas fa-venus"></i></span>' : '<i class="fas fa-mars"></i></span>');
        // @ts-ignore
        jQuery('input#suffix').val(ssinObject.suffix);
        // jQuery('input#suffix').get(0).setCustomValidity('');
        // @ts-ignore
        jQuery('input#checksum').val(ssinObject.checksum);
      }
      else {
        this.input.get(0).setCustomValidity('Invalid');
        jQuery('input#birthdate').val('');
        // @ts-ignore
        jQuery('input#number').val(ssinObject.number);
        // @ts-ignore
        if (ssinObject.number && ssinObject > 0) {
          // @ts-ignore
          jQuery('span#sex').html((ssinObject.number % 2 == 0) ? '<i class="fas fa-venus"></i></span>' : '<i class="fas fa-mars"></i></span>');
        }
        else {
          jQuery('span#sex').html('<i class="fas fa-venus-mars"></i></span>');
        }
        // @ts-ignore
        jQuery('input#suffix').val(ssinObject.suffix);
        // jQuery('input#suffix').get(0).setCustomValidity('Should be ' + ssinObject.checksum);
        // @ts-ignore
        jQuery('input#checksum').val(ssinObject.checksum);
      }
    });

    jQuery('button#copy-ddn').on('click', (evt)=>{
      evt.preventDefault();
      let ddn;
      // @ts-ignore
      if (jQuery('input#birthdate').val() != null && jQuery('input#birthdate').val().length == 10) {
        ddn = moment(jQuery('input#birthdate').val(), 'YYYY-MM-DD').format('YYYY, M, D');
        console.log('Should copy in clipboard', ddn);
        window.dispatchEvent(new CustomEvent('CopyText', {detail: {text: ddn}}));
      }
    });

    jQuery('button#clear').on('click', (evt)=>{
      evt.preventDefault();
      jQuery('.form-group').removeClass('was-validated');
      jQuery('input#ssin').val('');
      // @ts-ignore
      jQuery('input#ssin').get(0).setCustomValidity('');
      jQuery('input#birthdate').val('');
      jQuery('input#number').val('');
      jQuery('span#sex').html('<i class="fas fa-venus-mars"></i></span>');
      jQuery('input#suffix').val('');
      // @ts-ignore
      jQuery('input#suffix').get(0).setCustomValidity('');
      jQuery('input#checksum').val('');
    });

    jQuery('button#generate').on('click', (evt)=>{
      evt.preventDefault();
      let begin = '', number = '';
      // @ts-ignore
      if (jQuery('input#birthdate').val() != null && jQuery('input#birthdate').val().length == 10) {
        begin = moment(jQuery('input#birthdate').val(), 'YYYY-MM-DD').format('YYYYMMDD');
      }
      else {
        begin = this.generateRandomMoment().format('YYYYMMDD');
      }
      // @ts-ignore
      if (jQuery('input#number').val() != null && jQuery('input#number').val().length == 3) {
        // @ts-ignore
        number = String(parseInt(jQuery('input#number').val()));
      }
      else {
        // @ts-ignore
        number = sprintf('%03d',parseInt(Math.random() * 999));
      }
      const radix = parseInt(begin.substring(2) + number);
      let checksum;
      if (begin.startsWith('19')) {
        checksum = 97 - (radix % 97);
      } else if (begin.startsWith('2')) {
        checksum = 97 - ((2000000000 + radix) % 97);
      }

      let ssin = begin.substring(2) + number + sprintf('%02d', checksum);
      jQuery('input#ssin').val(ssin).trigger('input');
    });

}

  public parseSsin(input) {
    const text = input.trim();
    const ssin = {
      isValid: false
    };

    if (text.length == 11) {
      let birthdateText = this.removeBisNumberIfAny(text.substring(0, text.length - 5));
      let radix = parseInt(text.substring(0, text.length - 2));
      let suffix = parseInt(text.substring(text.length - 2, text.length));
// @ts-ignore
      ssin.suffix = suffix;
      // @ts-ignore
      ssin.number = parseInt(text.substring(text.length - 5, text.length - 2));
      let checksum = 97 - (radix % 97);
      // @ts-ignore
      ssin.checksum = checksum;

      if (checksum == suffix) {
        ssin.isValid = true;
        // @ts-ignore
        ssin.birthdate = moment('19' + birthdateText, 'YYYYMMDD');
      }
      else {
        checksum = 97 - ((2000000000 + radix) % 97);
        if (checksum == suffix) {
          ssin.isValid = true;
          // @ts-ignore
          ssin.birthdate = moment('20' + birthdateText, 'YYYYMMDD');
        }
      }
    }

    return ssin;
  }

  public removeBisNumberIfAny(text: any) {

    let year = parseInt(text.substring(0, 2));
    let month = parseInt(text.substring(2, 4));
    const initMonth = month;
    let day = parseInt(text.substring(4, 6));

    while (month > 12) {
      month -= 20;
    }
    if (month > 0 && month <= 12) {
      return sprintf('%02d%02d%02d', year, month, day);
    }
    else {
      return sprintf('%02d%02d%02d', year, initMonth, day);
    }
  }

  public generateRandomMoment() {
    const m = moment().subtract(Math.random() * moment().diff(moment('1900-01-01', 'YYYY-MM-DD')), 'ms');
    console.log('Generated random moment', m.format('YYYY-MM-DD'));

    return m;
  }

}