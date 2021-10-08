import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { parse as uuidParse } from 'uuid';
import { stringify as uuidStringify } from 'uuid';
import { version as uuidVersion } from 'uuid';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-uuid',
  templateUrl: './uuid.component.html',
  styleUrls: ['./uuid.component.scss']
})
export class UuidComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // @ts-ignore
    window.uppercase = jQuery('input#uppercase').prop('checked');

    jQuery('input#uppercase').on('change', (evt) => {
      // @ts-ignore
      window.uppercase = jQuery(evt.currentTarget).prop('checked');
      // @ts-ignore
      if (window.uppercase) {
        // @ts-ignore
        jQuery('input#hex').val(jQuery('input#hex').val().toUpperCase());
        // @ts-ignore
        jQuery('input#dbhex').val(jQuery('input#dbhex').val().toUpperCase());
        // @ts-ignore
        jQuery('input#uuid').val(jQuery('input#uuid').val().toUpperCase());
      } else {
        // @ts-ignore
        jQuery('input#hex').val(jQuery('input#hex').val().toLowerCase());
        // @ts-ignore
        jQuery('input#dbhex').val(jQuery('input#dbhex').val().toLowerCase());
        // @ts-ignore
        jQuery('input#uuid').val(jQuery('input#uuid').val().toLowerCase());
      }
    });

    jQuery('input#hex').on('input', (evt) => {
      let hex = jQuery(evt.currentTarget).val();
      if (this.validateHex(hex)) {
        // @ts-ignore
        let uuidFromHex = hex.replace(new RegExp('^([0-9a-zA-Z]{8})([0-9a-zA-Z]{4})([0-9a-zA-Z]{4})([0-9a-zA-Z]{4})([0-9a-zA-Z]{12})$'), '$1-$2-$3-$4-$5');
        try {
          // @ts-ignore
          let u = uuidParse(uuidFromHex);

          this.updateWithUUID(u);
        } catch (e) {
          console.debug(e);
        }
      }
    });

    jQuery('input#dbhex').on('input', (evt) => {
      let hex = jQuery(evt.currentTarget).val();
      if (this.validateHex(hex)) {
        // @ts-ignore
        let uuidFromHex = hex.replace(new RegExp('^0x([0-9a-zA-Z]{8})([0-9a-zA-Z]{4})([0-9a-zA-Z]{4})([0-9a-zA-Z]{4})([0-9a-zA-Z]{12})$'), '$1-$2-$3-$4-$5');
        try {
          let u = uuidParse(uuidFromHex);
          this.updateWithUUID(u);
        } catch (e) {
          console.debug(e);
        }
      }
    });

    jQuery('input#uuid').on('input', (evt) => {
      let hex = jQuery(evt.currentTarget).val();
      // @ts-ignore
      if (new RegExp('^[0-9a-zA-Z]{8}-([0-9a-zA-Z]{4}-){3}[0-9a-zA-Z]{12}$').test(hex)) {
        try {
          // @ts-ignore
          let u = uuidParse(hex);
          this.updateWithUUID(u);
        } catch (e) {
          console.debug(e);
        }
      }
    });

    jQuery('button.copy').on('click', (evt) => {
      evt.preventDefault();
      let hex = jQuery(evt.currentTarget).parents('.form-group').find('input').val();
      console.log('find a way to copy', hex);
      window.dispatchEvent(new CustomEvent('CopyText', {detail: {text: hex}}));
    });

    jQuery('button#generate').on('click', (evt) => {
      evt.preventDefault();
      jQuery('input#uuid').val(uuidv4());
      //Could also use uuid.v5('A random string', uuid.v5.URL)
      jQuery('input#uuid').trigger('input');
    });
  }


  public validateHex(hex: any) {
    return new RegExp('^[0-9a-zA-Z]{32}$').test(hex);
  }

  public validateDbHex(hex: any) {
    return new RegExp('^0x[0-9a-zA-Z]{32}$').test(hex);
  }

  public updateWithUUID(u: any) {
    let uString = uuidStringify(u);
    // @ts-ignore
    if (window.uppercase) {
      uString = uString.toUpperCase();
    } else {
      uString = uString.toLowerCase();
    }
    let uHex = uString.replace(/-/g, '');
    jQuery('input#uuid').val(uString);
    jQuery('input#hex').val(uHex);
    jQuery('input#dbhex').val('0x' + uHex);
    jQuery('input#version').val(uuidVersion(uString));
    console.log('Setting version to ', uuidVersion(uString));
  }

}