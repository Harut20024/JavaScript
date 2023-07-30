function pow(base, exponent) {
   if(exponent<=1) return base
   return base*pow(base, exponent-1)

}


alert(pow(5,3))