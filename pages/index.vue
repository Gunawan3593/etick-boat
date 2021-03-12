<template>
  <v-layout>
    <v-container class="mt-10 justify-center">
        <v-row>
          <v-col cols="12">
            <v-carousel
            height="400"
            cycle
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(item,i) in slides"
              :key="i"
              :src="item.src"
            >
              <v-sheet
                color="rgba(0, 0, 0, 0.5)"
                height="10%"
                class="mt-10"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-1">
                    {{ item.caption }}
                  </div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-sheet
              color="green"
              elevation="9"
              height="50"
            >
              <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-1">
                    Lists Boats Pricing
                  </div>
                </v-row>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-sheet
              color="green"
              elevation="9"
              height="50"
            >
              <v-card></v-card>
            </v-sheet>
          </v-col>
        </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          src: 'https://www.balitoursclub.net/wp-content/uploads/2019/08/Speed-boat-Yamuna-Express-ke-Nusa-Penida.jpg',
          caption: 'Yamuna Express'
        },
        {
          src: 'https://cdn.water-sport-bali.com/wp-content/uploads/2014/05/Fast-Boat-Wahana-Gili-Ocean-II.jpg',
          caption: 'Wahana Gili Ocean II'
        },
        {
          src: 'https://lh3.googleusercontent.com/-k5HL1A1H1oQ/WBPTpLLAtYI/AAAAAAAADMM/0fHSrvLBd7M/s640/blogger-image-1979537033.jpg',
          caption: 'Blue Water Express'
        },
        {
          src: 'https://lh3.googleusercontent.com/-Sm1NBzdfc2c/VrVa4TzkTaI/AAAAAAAACnc/95dDUBL-dZ8/s640/blogger-image--1975066449.jpg',
          caption: 'Marina Srikandi II'
        }
      ]
    }
  }
}
</script>

<style>

</style>
