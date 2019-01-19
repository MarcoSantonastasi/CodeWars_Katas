// https://www.codewars.com/kata/multiplying-numbers-as-strings/train/javascript


// My solution
function multiply(a, b) {
    const product = Array(a.length+b.length).fill(0);
    for (let i = a.length; i--;) {
        let carry = 0;
        for (let j = b.length; j--;) {
            product[1+i+j] += carry + a[i]*b[j];
            carry = Math.floor(product[1+i+j] / 10);
            product[1+i+j] = product[1+i+j] % 10;
        }
        product[i] += carry;
    }
    return product.join("").replace(/^0*(\d)/, "$1");

}

console.log(multiply("2", "3"), " <=> 6")

// OFFICIAL SOLUTION

function multiply(a, b) {
  var aa = a.split('').reverse();
  var bb = b.split('').reverse();

  var stack = [];

  for (var i = 0; i < aa.length; i++) {
    for (var j = 0; j < bb.length; j++) {
      var m = aa[i] * bb[j];
      stack[i + j] = (stack[i + j]) ? stack[i + j] + m : m;
    }
  }

  for (var i = 0; i < stack.length; i++) {
    var num = stack[i] % 10;
    var move = Math.floor(stack[i] / 10);
    stack[i] = num;

    if (stack[i + 1])
      stack[i + 1] += move;
    else if (move != 0)
      stack[i + 1] = move;
  }


  return stack.reverse().join('').replace(/^(0(?!$))+/, "");
}

// Test cases

describe('Some simple multiplications', function() {
  it('simple', function() {
    Test.assertEquals(multiply("2", "3"), "6");
    Test.assertEquals(multiply("30", "69"), "2070");
    Test.assertEquals(multiply("11", "85"), "935");
  });
});

describe('Some corner case', function() {
  it('corner cases', function() {
    Test.assertEquals(multiply("2" ,"0"), "0");
    Test.assertEquals(multiply("0", "30"), "0");
    Test.assertEquals(multiply("0000001", "3"), "3");
    Test.assertEquals(multiply("1009", "03"), "3027");
  });
});

describe('Some big multiplications', function() {
  it('big boys', function() {
    Test.assertEquals(multiply("98765", "56894"), "5619135910");
    Test.assertEquals(multiply("1020303004875647366210", "2774537626200857473632627613"), "2830869077153280552556547081187254342445169156730");
    Test.assertEquals(multiply("58608473622772837728372827", "7586374672263726736374"), "444625839871840560024489175424316205566214109298");
    Test.assertEquals(multiply("9007199254740991", "9007199254740991"), "81129638414606663681390495662081");
  });
});

describe('bigger multiplications', function() {
  it('some bigger boys', function() {
    Test.assertEquals(multiply("823094582094385190384102934810293481029348123094818923749817", "234758927345982475298347523984572983472398457293847594193837"), "193228801196767580936937025179030242333589969343595453380648878181298632138525604729517840510039331578252599113191277829");
    Test.assertEquals(multiply("234859234758913759182357398457398474598237459823745928347538", "987429134712934876249385134781395873198472398562384958739845"), "231906850957336251478991186749656947273668952935732312056617840392053573968250329123967229808683079035824473891688251610");
    Test.assertEquals(multiply("854694587458967459867923420398420394845873945734985374844444", "333333333333439439483948394839834938493843948394839432322229"), "284898195819746508308601272526843276932725891934702757921192020155666470878325339438152527308303674417037959666558345676");
    Test.assertEquals(multiply('666666665656566666666565656666666656565666666665656566666666', '464646464646464644646464646464646464646464646463463463463466'), "309764309294970369158202226146309759616554024914566927342293185187019287979125791001525185185160758579124577351091024356");
    Test.assertEquals(multiply("987429134712934876249385134781395873198472398562384958739845234859234758913759182357398457398474598237459823745928347538", "835743829547328954732895474893754893753281957319857432958432548937859483265893274891378593187431583942678439217431924789"), "825237806451593565479540372134946155438918929176593465466377189876140064578697720538106222103669673453926917713105695761983364398691630451089031488925855360833239652072136952127779284221960464892396337248321438942716276105221888865469319482");
  });
});

describe('random multiplications', function() {
  it('random bigger boys', function() {
    for(var i = 0; i < 100; i++)
    {
      var rVal = "", lVal = "";
      var len = Math.floor(Math.random()*200)+1;
      for(var j = 0; j < len; j++)
      {
        rVal += Math.floor(Math.random()*10)+"";
        lVal += Math.floor(Math.random()*10)+"";      
      }
      Test.assertEquals(multiply(lVal, rVal), multiplyX(lVal, rVal));
    }
  });
});



function multiplyX(a, b)
{
	var result = [];
	for(var i = a.length-1; i >= 0; i--)
	{
		var subSum = "";
		var flag = 0;
		for(var j = b.length-1; j >= 0; j--)
		{
			var z = a.charAt(i)*b.charAt(j)+flag;
			if(z>9 && j>0)
			{
			  flag = Math.floor(z/10);
			  subSum = (z-flag*10)+subSum;
			}
			else
			{
			  subSum = z+subSum;
			  flag = 0;
			}
		}
		result.push(subSum);
	}
	var hResult = "0";
	for(var i = 0; i < result.length; i++)
	{
		hResult = add(hResult, result[i]+addZeros(i));
	}
  hResult = hResult.replace(/^0+/g,"");
	return ((hResult == "")? "0" : hResult);
}

function add(i, j)
{
  var result = "";
  var flag = 0;
  for(var c = i.length-1, d = j.length-1; c >= 0 || d >= 0; c--, d--)
  {
    var z = i.charAt(c)*1 + j.charAt(d)*1 + flag;
    if(z>9 && (c>0 || d>0))
    {
      flag = Math.floor(z/10);
      result = (z-flag*10)+result;
    }
    else
    {
      result = z+result;
      flag = 0;
    }
  }
  result = result.replace(/^0+/g,"");
  return ((result == "")? "0" : result);
}

function addZeros(i)
{
	var z = "";
	for(var j = 0; j < i; j++)
	{
		z += "0";
	}
	return z;
}
