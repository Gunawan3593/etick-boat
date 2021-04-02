<template>
  <v-container class="mt-10">
    <v-layout>
      <v-row
        align="center"
        justify="center"
      >
      <v-col
        cols="12"
        sm="12"
        md="4"
      >
          <v-card
              class="mx-auto"
              max-width="300"
              outlined
          >
              <v-list-item three-line>
              <v-list-item-content>
                  <v-list-item-title class="headline mb-1">Pending <span class="caption font-weight-bold">Order</span></v-list-item-title>
                  <v-list-item-subtitle>Counter Pending Booking order no {{ month }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                  tile
                  size="80"
                  color="error"
              ><span class="white--text font-weight-medium display-1">{{ pendingBooking }}</span></v-list-item-avatar>
              </v-list-item>
          </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
      >
      <v-card
              class="mx-auto"
              max-width="300"
              outlined
          >
              <v-list-item three-line>
              <v-list-item-content>
                  <v-list-item-title class="headline mb-1">Pending <span class="caption font-weight-bold">Payment</span></v-list-item-title>
                  <v-list-item-subtitle>Counter pending payment on {{ month }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                  tile
                  size="80"
                  color="orange lighten-1"
              ><span class="white--text font-weight-medium display-1">{{ pendingPayment }}</span></v-list-item-avatar>
              </v-list-item>
          </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
      >
          <v-card
              class="mx-auto"
              max-width="300"
              outlined
          >
              <v-list-item three-line>
              <v-list-item-content>
                  <v-list-item-title class="headline mb-1">Booking <span class="caption font-weight-bold">Success</span></v-list-item-title>
                  <v-list-item-subtitle>Counter Booking Success on {{ month }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                  tile
                  size="80"
                  color="light-green"
              ><span class="white--text font-weight-medium display-1">{{ bookingSuccess }}</span></v-list-item-avatar>
              </v-list-item>
          </v-card>
      </v-col>
    <v-col
      cols="12"
      sm="12"
      md="4"
    >
        <v-card
            class="mx-auto"
            max-width="300"
            outlined
        >
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">Pending</v-list-item-title>
                <v-list-item-subtitle>Total pending booking on {{ month }}</v-list-item-subtitle>
                {{ totalPending| currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="blue darken-1"
            ><v-icon x-large dark>mdi-cart</v-icon></v-list-item-avatar>
            </v-list-item>
        </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="4"
    >
     <v-card
            class="mx-auto"
            max-width="300"
            outlined
        >
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">Sold</v-list-item-title>
                <v-list-item-subtitle>Total booking sold on {{ month }}</v-list-item-subtitle>
                {{ totalSuccess | currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="light-green"
            ><v-icon x-large dark>mdi-shopping</v-icon></v-list-item-avatar>
            </v-list-item>
        </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="4"
    >
        <v-card
            class="mx-auto"
            max-width="300"
            outlined
        >
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">Top Booked</v-list-item-title>
                <v-list-item-subtitle>Top booked on {{ month }}</v-list-item-subtitle>
                {{ topBooked.name }} - {{ topBooked.total | currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="orange lighten-1"
            ><v-icon x-large dark>mdi-shopping-search</v-icon></v-list-item-avatar>
            </v-list-item>
        </v-card>
    </v-col>
        <v-col cols="12">
            <v-card elevation="3">
                <v-card-text>
                    <v-row>
                    <v-col lg="6" md="6" cols="12">
                        <client-only>
                            <apexchart type="line" :options="optChartTime" :series="srsChartTime"></apexchart>
                        </client-only>
                    </v-col>
                    <v-col lg="6" md="6" cols="12">
                        <client-only>
                            <apexchart type="line" :options="optChartWeek" :series="srsChartWeek"></apexchart>
                        </client-only>
                    </v-col>
                    <v-col lg="12" md="12" cols="12">
                        <client-only>
                            <apexchart type="line" height="400" :options="optChartMonth" :series="srsChartMonth"></apexchart>
                        </client-only>
                    </v-col>
                    </v-row>
                </v-card-text>                
            </v-card>
        </v-col>
    </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  middleware: 'authenticated',
  data(){
      return {
        month: this.$moment().format('MMMM'),
        pendingBooking: 0,
        bookingSuccess: 0,
        pendingPayment:0,
        totalPending:0,
        totalSuccess: 0,
        topBooked: {
            name: '',
            total: 0
        },
        optChartTime: {},
        srsChartTime: [],
        optChartWeek: {},
        srsChartWeek: [],
        optChartMonth: {},
        srsChartMonth: [],
        hourLabels: [],
        hourValue: [],
        dayLabels: [],
        dayValue: [],
        monthLabels:[],
        monthValue:[]
      }
  },
  methods: {
    ...mapActions({
        countBooking: 'booking/countBooking',
        countPayment: 'payment/countPayment',
        totalBooking: 'booking/totalBooking',
        topBooking: 'booking/topBooking',
        bookingWeekly: 'booking/bookingWeekly',
        bookingByTime: 'booking/bookingByTime',
        bookingMonthly: 'booking/bookingMonthly'
    }),
    async drawchartTime() {
        let date = this.$moment().format('YYYY-MM-DD');
            let params = {
                date: date,
                status: 2
            }
            let data = await this.bookingByTime(params);
            if (data){
                let hours = [];
                let date = new Date();
                let curHours = date.getHours().toString();
                let curTime = parseInt(('00'+curHours).substring(curHours.length) + '00') + 100 ;
                let period = 800;
                let time = 0;
                let startTime = curTime - period;
                if (startTime < 0) {
                    let startLastday = 2300 + startTime;
                    for(let i=1;i<=((startTime*-1)/100);i++){
                        startLastday += 100;
                        hours.push(startLastday);
                    }
                    let yesterdate = new Date();
                    yesterdate.setDate(yesterdate.getDate()-1);
                    params.date = yesterdate;
                    let lastData = await this.bookingByTime(params);
                    if (lastData){
                        lastData.forEach(row => {
                            time = parseInt(row.hour);
                            hours.forEach((hour,i) => {
                                if (time == hours[i]) {
                                    if(this.hourValue[i] == undefined) {
                                        this.hourValue.push(0)
                                    }
                                    this.hourValue[i] += row.total;
                                }else{
                                    if(this.hourValue[i] == undefined) {
                                        this.hourValue.push(0)
                                    }
                                }
                            })
                        });
                        if(lastData.length == 0){
                            for(let i=0;i<hours.length;i++){
                                this.hourValue.push(0)
                            }
                        }
                    }
                    let limit = (period/100)-hours.length;
                    for(let i=0;i<limit;i++){
                        hours.push(i*100);
                    }
                }else{
                    let startDay = startTime-100;
                    let limit = period / 100;
                    for(let i=0;i<limit;i++){
                        startDay += 100;
                        hours.push(startDay);
                    }
                }
                data.forEach(row => {
                    time = parseInt(row.hour);
                    hours.forEach((hour,i) => {
                        if (time == hours[i]) {
                            if(this.hourValue[i] == undefined) {
                                this.hourValue.push(0)
                            }
                            this.hourValue[i] += row.total;
                        }else{
                            if(this.hourValue[i] == undefined) {
                                this.hourValue.push(0)
                            }
                        }
                    })
                });
                if(data.length == 0){
                    let limit = (period/100)-this.hourValue.length;
                    for(let i=0;i<limit;i++){
                        this.hourValue.push(0)
                    }
                }
                //redraw hour label 
                hours.forEach(row=>{
                    row = ('0000'+row.toString()).substring(row.toString().length);
                    row = row.substring(0,2) + ':' + row.substring(2);
                    this.hourLabels.push(row);
                });
            }
        },
    async drawchartWeek(){
        let params = {
            monday: this.$moment().day(1).format('YYYY-MM-DD'),
            sunday: this.$moment().day(7).format('YYYY-MM-DD'),
            status : 2
        }
        let data = await this.bookingWeekly(params);
        if (data){
            let dows = [];
            let date = new Date();
            let curDay = date.getDay();
            let day = 0;
            let period = 7;
            let startDate = curDay - period;
            if(startDate < 0) {
                for(let i=(period+startDate)+1;i<=period;i++){
                    dows.push(i);
                }
                let lastweek = new Date();
                lastweek.setDate(lastweek.getDate()-7);
                params.monday = this.$moment(lastweek).day(1).format('YYYY-MM-DD');
                params.sunday = this.$moment(lastweek).day(7).format('YYYY-MM-DD');
                let lastData = await this.bookingWeekly(params);
                if (lastData){
                    lastData.forEach(row => {
                        day = row.day;
                        dows.forEach((dow, i) => {
                            if (day == dow) {
                                if(this.dayValue[i] == undefined) {
                                    this.dayValue.push(0)
                                }
                                this.dayValue[i] += row.total;
                            }else{
                                if(this.dayValue[i] == undefined) {
                                    this.dayValue.push(0)
                                }
                            }
                        });
                    });
                    if(lastData.length == 0){
                        for(let i=0;i<dows.length;i++){
                            this.dayValue.push(0)
                        }
                    }
                }
                let limit = period-dows.length;
                for(let i=1;i<=limit;i++){
                    dows.push(i);
                }
            }else{
                for(let i=1;i<=period;i++){
                    dows.push(i);
                }
            }
            data.forEach(row=>{
                day = row.day;
                dows.forEach((dow, i) => {
                    if (day == dow) {
                        if(this.dayValue[i] == undefined) {
                            this.dayValue.push(0)
                        }
                        this.dayValue[i] += row.total;
                    }else{
                        if(this.dayValue[i] == undefined) {
                            this.dayValue.push(0)
                        }
                    }
                });
            });
            if(data.length == 0){
                for(let i=this.dayValue.length;i<dows.length;i++){
                    this.dayValue.push(0)
                }
            }
            //redraw hour label 
            dows.forEach(item=>{
                let dow = this.getDayName(item);
                this.dayLabels.push(dow);
            });
        }
    },
    async drawchartMonth(){
        let params = {
            date: this.$moment().format('YYYY-MM-DD'),
            status : 2
        }
        let data = await this.bookingMonthly(params);
        let months = [];
        let curMonth = new Date().getMonth()+1;
        let period = 12;
        let startDate = curMonth - period;
        if (data){
            if(startDate<0){
                for(let i=(period+startDate)+1;i<=period;i++){
                    months.push(i);
                }
                let lastyear = new Date();
                lastyear.setFullYear(lastyear.getFullYear()-1);
                params.date = this.$moment(lastyear).format('YYYY-MM-DD');
                let lastData = await this.bookingMonthly(params);
                if(lastData){
                    lastData.forEach(row => {
                        month = row.day;
                        months.forEach((item, i) => {
                            if (month == months[i]) {
                                if(this.monthValue[i] == undefined) {
                                    this.monthValue.push(0)
                                }
                                this.monthValue[i] += row.total;
                            }else{
                                if(this.monthValue[i] == undefined) {
                                    this.monthValue.push(0)
                                }
                            }
                        });
                    });
                    if(lastData.length == 0){
                        for(let i=0;i<months.length;i++){
                            this.monthValue.push(0)
                        }
                    }
                    let limit = period-months.length;
                    for(let i=1;i<=limit;i++){
                        months.push(i);
                    }
                }
            }
            else{
                for(let i=1;i<=period;i++){
                    dows.push(i);
                }
            }
            data.forEach(row=>{
                let month = row.month;
                months.forEach((item, i) => {
                    if (month == months[i]) {
                        if(this.monthValue[i] == undefined) {
                            this.monthValue.push(0)
                        }
                        this.monthValue[i] += row.total;
                    }else{
                        if(this.monthValue[i] == undefined) {
                            this.monthValue.push(0)
                        }
                    }
                });
            });
            if(data.length == 0){
                for(let i=this.monthValue.length;i<months.length;i++){
                    this.monthValue.push(0)
                }
            }
            //redraw hour label 
            months.forEach(item=>{
                let month = this.getMonthName(item);
                this.monthLabels.push(month);
            });
        }
    },
    async getData(){
        let date = this.$moment().format('YYYY-MM-DD');
        let params = {
            date: date,
            status: 0
        }
        let data = await this.countBooking(params);
        this.pendingBooking = data.total;
        params = {
            date: date,
            status: 2
        }
        data = await this.countBooking(params);
        this.bookingSuccess = data.total;
        params = {
            date: date,
            status: 0
        }
        data = await this.countPayment(params);
        this.pendingPayment = data.total;
        params = {
            date: date,
            status: 0
        }
        data = await this.totalBooking(params);
        this.totalPending = data.total;
        params = {
            date: date,
            status: 2
        }
        data = await this.totalBooking(params);
        this.totalSuccess = data.total;
        params = {
            date: date,
            status: 2
        }
        data = await this.topBooking(params);
        this.topBooked = data;
    },
    nFormatter: function (num, digits) {
        var si = [
            { value: 1, symbol: "" },
            { value: 1E3, symbol: "K" },
            { value: 1E6, symbol: "M" },
            { value: 1E9, symbol: "G" },
            { value: 1E12, symbol: "T" },
            { value: 1E15, symbol: "P" },
            { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (Math.abs(num) >= si[i].value) {
            break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    },
    getDayName(day){
        let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
        let dayName = days[day-1];
        return dayName;
    },
    getMonthName(month){
        let months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
        let monthName = months[month-1];
        return monthName;
    }
  },
  async created(){
    await this.getData();
    await this.drawchartTime();
    this.optChartTime = {
        chart: {
            zoom: {
            enabled: false
            },
        },
        stroke: {
            width: 5,
            curve: 'smooth'
        },
        markers: {
            size: 4,
            colors: ["#FFA41B"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
            size: 7,
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
            shade: 'dark',
            gradientToColors: [ '#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
            },
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
            },
        },
        xaxis: {
            categories : this.hourLabels
        },
        yaxis: {
            labels: {
                formatter:(value) => { 
                    return this.nFormatter(value,0)
                }
            }
        }
    };
    this.srsChartTime.push({
        name: 'Sales',
        data: this.hourValue
    });
    await this.drawchartWeek();
    this.optChartWeek = {
        chart: {
            zoom: {
            enabled: false
            },
        },
        stroke: {
            width: 5,
            curve: 'smooth'
        },
        markers: {
            size: 4,
            colors: ["#FFA41B"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
            size: 7,
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
            shade: 'dark',
            gradientToColors: [ '#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
            },
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
            },
        },
        xaxis: {
            categories : this.dayLabels
        },
        yaxis: {
            labels: {
                formatter:(value) => { 
                    return this.nFormatter(value,0)
                }
            }
        }
    };
    this.srsChartWeek.push({
        name: 'Sales',
        data: this.dayValue
    });
    await this.drawchartMonth();
    this.optChartMonth = {
        chart: {
            zoom: {
            enabled: false
            },
        },
        stroke: {
            width: 5,
            curve: 'smooth'
        },
        markers: {
            size: 4,
            colors: ["#FFA41B"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
            size: 7,
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
            shade: 'dark',
            gradientToColors: [ '#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
            },
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
            },
        },
        xaxis: {
            categories : this.monthLabels
        },
        yaxis: {
            labels: {
                formatter:(value) => { 
                    return this.nFormatter(value,0)
                }
            }
        }
    };
    this.srsChartMonth.push({
        name: 'Sales',
        data: this.monthValue
    });
  }
}
</script>

<style>
@media screen and (max-width: 375px) {
    body {
      max-width: 375px;
    }
    .v-card {
      max-width: 350px;
    }
    .v-card__text {
      min-width: 330px;
    }
  }

@media screen and (max-width: 340px) {
    body {
      max-width: 340px;
    }
    .v-card {
      max-width: 320px;
    }
    .v-card__text {
      min-width: 320px;
    }
  }
</style>