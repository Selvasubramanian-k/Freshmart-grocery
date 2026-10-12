// ─────────────────────────────────────────────────────────────
//  SINGLE SOURCE OF TRUTH for all products.
//  Pudhu product add panna -> inge mattum add pannunga.
//  (ProductList, CartDrawer, CheckoutPage, OrderSuccess ellam inga irundhu edukkum)
//

// ─────────────────────────────────────────────────────────────
import apple from '../assets/apple.jpg'
import ghee    from '../assets/ghee.jpg'
import Brinjal from '../assets/brinjal.jpg'
import orange from '../assets/orange.jpg'
import banana  from '../assets/banana.jpg'
import pinapple from '../assets/Pineapple.jpeg'
import carrot from '../assets/carrot.png'
import potato from '../assets/Fresh-Potato.jpeg'
import tomato from '../assets/Tomato-Local.png'
import onion from  '../assets/Onion.jpg'
import watermelon from '../assets/Watermelon-Kiran-Tarbooj-.jpg'
import lemon from '../assets/lemonf.jpg'
import Beetroot from '../assets/Beetroot.jpeg'
import Icecream from '../assets/Icecream.jpg'
import Masalamuruku from '../assets/muruku.jpg'
import milk from '../assets/milk.jpg'
import butter from '../assets/butter.jpeg'
import curd from '../assets/curd.jpg'
import egg from '../assets/eggs.jpg'
import paneer from '../assets/panneer.jpg'
import tea from '../assets/3roses.jpg'
import brucoffee from '../assets/brucoffee.jpg'
import tendercoc from '../assets/tendercoc.jpg'
import buttermilk from '../assets/buttermilk.png'
import hotcho from '../assets/hotcho.jpg'
import bread from '../assets/bread.jpg'
import lemonsoda from '../assets/lemonsoda.jpg'
import rusk from '../assets/rusk.jpg'
import oats from '../assets/oats.jpg'
import mariegold from '../assets/marigold.jpg'
import batter from'../assets/batter.jpg'
import wash from '../assets/wash.jpg'
import liquid from '../assets/liqid.jpg'
import floorcleaner from '../assets/floorcleaner.jpg'
import chocomilk from '../assets/chocomilk.jpg'
import mango from '../assets/mango.png'
import sugar from '../assets/sugar.jpg'
import rice from '../assets/rice.jpg'
import sunfloweroil from '../assets/sunflower.jpg'
import dal from '../assets/dal.jpg'
import salt from '../assets/salt.jpg'
import jaggery from '../assets/jaggery.png'
import pedi from '../assets/pedi.jpg'
import petbiscut from '../assets/petbiscut.jpg'
import petsamboo from '../assets/petshamboo.jpg'
import petcolloar from '../assets/petcolloar.jpg'
import lays from '../assets/lays.jpeg'
import bingoo from '../assets/bingoo.jpg'
import sprite from '../assets/sprite.jpg'
import cookies from '../assets/cookies.jpg'
import fish from '../assets/fish.jpg'
import chicken from '../assets/chicken.jpg'
import mutton from '../assets/mutton.jpg'
import liver   from '../assets/liver.jpg'
export const PRODUCTS = [

  // ── FRUITS & VEGETABLES ──────────────────
  { id:1,  name:'Red Apples',    unit:'1 kg',    price:120, oldPrice:150,  discount:20,  cat:'fruits',  tag:'popular', img:apple },
  { id:2,  name:'Banana',        unit:'1 dozen', price:60,  oldPrice:null, discount:null, cat:'fruits',  tag:'organic', img:banana },
  { id:3,  name:'Orange',        unit:'1 kg',    price:80,  oldPrice:100,  discount:20,  cat:'fruits',  tag:'popular', img:orange},
  { id:4,  name:'Pineapple',     unit:'1 pc',    price:90,  oldPrice:110,  discount:18,  cat:'fruits',  tag:'new',     img:pinapple },
  { id:5,  name:'Carrot',        unit:'500 g',   price:40,  oldPrice:50,   discount:20,  cat:'fruits',  tag:'organic', img:carrot},
  { id:6,  name:'Beetroot',      unit:'500 g',   price:35,  oldPrice:null, discount:null, cat:'fruits',  tag:'organic', img:Beetroot },
  { id:7,  name:'Potato',        unit:'1 kg',    price:30,  oldPrice:40,   discount:25,  cat:'fruits',  tag:'popular', img:potato },
  { id:8,  name:'Tomato',        unit:'500 g',   price:25,  oldPrice:35,   discount:28,  cat:'fruits',  tag:'sale',    img:tomato },
  { id:9,  name:'Brinjal',       unit:'500 g',   price:30,  oldPrice:null, discount:null, cat:'fruits',  tag:'new',     img:Brinjal },
  { id:47, name:'Onion',         unit:'1 kg',    price:45,  oldPrice:55,   discount:18,  cat:'fruits',  tag:'popular', img:onion},
  { id:48, name:'Watermelon',    unit:'1 pc',    price:70,  oldPrice:null, discount:null, cat:'fruits',  tag:'new',     img:watermelon },
  { id:49, name:'Lemon',         unit:'250 g',   price:25,  oldPrice:null, discount:null, cat:'fruits',  tag:'popular', img:lemon },

  // ── MEAT & FISH ──────────────────────────
  { id:10, name:'Fish (Rohu)',        unit:'500 g', price:180, oldPrice:220, discount:18, cat:'meat', tag:'popular', img:fish },
  { id:11, name:'Chicken Boneless',   unit:'500 g', price:220, oldPrice:260, discount:15, cat:'meat', tag:'sale',    img:chicken },
  { id:12, name:'Chicken Liver',      unit:'250 g', price:90,  oldPrice:110, discount:18, cat:'meat', tag:'new',     img:liver },
  { id:13, name:'Mutton',             unit:'500 g', price:450, oldPrice:500, discount:10, cat:'meat', tag:'popular', img:mutton },

  // ── SNACKS ───────────────────────────────
  { id:14, name:'Lays Classic',     unit:'100 g',  price:20, oldPrice:null, discount:null, cat:'snacks', tag:'popular', img:lays },
  { id:15, name:'Bingo Mad Angles', unit:'90 g',   price:20, oldPrice:25,   discount:20,   cat:'snacks', tag:'sale',    img:bingoo },
  { id:16, name:'Soft Drinks',      unit:'500 ml', price:40, oldPrice:50,   discount:20,   cat:'snacks', tag:'popular', img:sprite },
  { id:17, name:'Cookies',          unit:'200 g',  price:30, oldPrice:null, discount:null, cat:'snacks', tag:'new',     img:cookies },
  { id:50, name:'Ice Cream',        unit:'500 ml', price:150, oldPrice:180,  discount:16,   cat:'snacks', tag:'popular', img:Icecream },
  { id:51, name:'Masala Mixture',   unit:'200 g',  price:45, oldPrice:null, discount:null, cat:'snacks', tag:'popular', img:Masalamuruku },

  // ── PET CARE ─────────────────────────────
  { id:18, name:'Pedigree Dog Food', unit:'1 kg',   price:350, oldPrice:400, discount:12, cat:'petcare', tag:'popular', img:pedi },
  { id:19, name:'Pet Biscuits',      unit:'500 g',  price:150, oldPrice:180, discount:16, cat:'petcare', tag:'sale',    img:petbiscut },
  { id:20, name:'Pet Shampoo',       unit:'200 ml', price:250, oldPrice:300, discount:16, cat:'petcare', tag:'new',     img:petsamboo },
  { id:21, name:'Pet Collar',        unit:'1 pc',   price:199, oldPrice:250, discount:20, cat:'petcare', tag:'popular', img:petcolloar },

  // ── DAIRY ────────────────────────────────
  { id:22, name:'Full Cream Milk',  unit:'1 L',    price:68,  oldPrice:null, discount:null, cat:'dairy', tag:'popular', img:milk },
  { id:23, name:'Butter',           unit:'100 g',  price:55,  oldPrice:65,   discount:15,   cat:'dairy', tag:'sale',    img:butter },
  { id:24, name:'Ghee',             unit:'500 ml', price:350, oldPrice:400,  discount:12,   cat:'dairy', tag:'popular', img:ghee },
  { id:25, name:'Sembal (Curd)',    unit:'500 g',  price:40,  oldPrice:null, discount:null, cat:'dairy', tag:'organic', img:curd },
  { id:26, name:'Egg (Farm Fresh)', unit:'12 pcs', price:90,  oldPrice:110,  discount:18,   cat:'dairy', tag:'popular', img:egg },
  { id:46, name:'Paneer',           unit:'200 g',  price:85,  oldPrice:null, discount:null, cat:'dairy', tag:'new',     img:paneer },

  // ── BEVERAGE ─────────────────────────────
  { id:27, name:'Mango Juice',      unit:'1 L',    price:60,  oldPrice:80,   discount:25,   cat:'beverage', tag:'popular', img:mango },
  { id:28, name:'Choco Milk',       unit:'500 ml', price:45,  oldPrice:55,   discount:18,   cat:'beverage', tag:'popular', img:chocomilk },
  { id:29, name:'Tea Powder',       unit:'250 g',  price:120, oldPrice:135,  discount:11,   cat:'beverage', tag:'popular', img:tea },
  { id:30, name:'Coffee Powder',    unit:'200 g',  price:180, oldPrice:200,  discount:10,   cat:'beverage', tag:'popular', img:brucoffee },
  { id:31, name:'Tender Coconut',   unit:'1 pc',   price:40,  oldPrice:null, discount:null, cat:'beverage', tag:'organic', img:tendercoc },
  { id:32, name:'Buttermilk',       unit:'500 ml', price:20,  oldPrice:null, discount:null, cat:'beverage', tag:'popular', img:buttermilk },
  { id:33, name:'Lemon Soda',       unit:'300 ml', price:25,  oldPrice:30,   discount:16,   cat:'beverage', tag:'new',     img:lemonsoda},
  { id:34, name:'Hot Chocolate Mix',unit:'200 g',  price:160, oldPrice:190,  discount:15,   cat:'beverage', tag:'new',     img:hotcho },

  // ── BREAKFAST ────────────────────────────
  { id:35, name:'Bread',            unit:'400 g',  price:40,  oldPrice:null, discount:null, cat:'breakfast', tag:'popular', img:bread },
  { id:36, name:'Rusk',             unit:'200 g',  price:35,  oldPrice:null, discount:null, cat:'breakfast', tag:'popular', img:rusk },
  { id:37, name:'Oats',             unit:'500 g',  price:99,  oldPrice:120,  discount:17,   cat:'breakfast', tag:'organic', img:oats },
  { id:38, name:'Marie Biscuits',   unit:'250 g',  price:30,  oldPrice:null, discount:null, cat:'breakfast', tag:'popular', img:mariegold },
  { id:39, name:'Idli / Dosa Batter',unit:'1 kg',  price:55,  oldPrice:null, discount:null, cat:'breakfast', tag:'popular', img:batter },

  // ── COOKING ──────────────────────────────
  { id:40, name:'Sugar',            unit:'1 kg',   price:48,  oldPrice:null, discount:null, cat:'cooking', tag:'popular', img:sugar },
  { id:41, name:'Rice (Ponni)',     unit:'5 kg',   price:340, oldPrice:380,  discount:10,   cat:'cooking', tag:'popular', img:rice },
  { id:42, name:'Sunflower Oil',    unit:'1 L',    price:135, oldPrice:150,  discount:10,   cat:'cooking', tag:'sale',    img:sunfloweroil },
  { id:43, name:'Toor Dal',         unit:'500 g',  price:85,  oldPrice:null, discount:null, cat:'cooking', tag:'popular', img:dal },
  { id:44, name:'Salt',             unit:'1 kg',   price:20,  oldPrice:null, discount:null, cat:'cooking', tag:'popular', img:salt },
  { id:45, name:'Jaggery',          unit:'500 g',  price:55,  oldPrice:null, discount:null, cat:'cooking', tag:'organic', img:jaggery },

  // ── HOME & CLEANING ──────────────────────
  { id:52, name:'Detergent Powder', unit:'1 kg',   price:110, oldPrice:130,  discount:15,   cat:'home', tag:'sale',    img:wash},
  { id:53, name:'Dishwash Liquid',  unit:'500 ml', price:95,  oldPrice:null, discount:null, cat:'home', tag:'popular', img:liquid },
  { id:54, name:'Floor Cleaner',    unit:'1 L',    price:140, oldPrice:165,  discount:15,   cat:'home', tag:'new',     img:floorcleaner },
]

export const getProduct = (id) => PRODUCTS.find(p => p.id === Number(id))

export const DELIVERY = 5.00
