list = [
    "Jackson", "Mia", "Aiden", "Amelia", "Lucas", "Harper", "Elijah", "Evelyn", "Oliver", "Abigail", 
    "Grayson", "Emily", "Benjamin", "Isabella", "Carter", "Sophia", "Ava", "Noah", "Emma", "Liam", 
    "Luna", "Olivia", "Mason", "Aria", "Logan", "Ella", "James", "Charlotte", "Alexander", "Scarlett", 
    "Michael", "Grace", "Ethan", "Chloe", "William", "Lily", "Luna", "Sofia", "Henry", "Avery", "Daniel", 
    "Zoe", "Aria", "Ellie", "Matthew", "Stella", "Lucy", "Mila", "Victoria", "Layla", "Riley", "Eva", 
    "Levi", "Maya", "Asher", "Hazel", "Leah", "Mila", "Wyatt", "Nora", "Luke", "Piper", "Gabriel", 
    "Aubrey", "Owen", "Ruby", "Jack", "Clara", "Caleb", "Penelope", "Connor", "Eleanor", "Jayden", 
    "Aurora", "Dylan", "Nova", "Julian", "Violet", "Jeremiah", "Camila", "Colton", "Zara", "Nathan", 
    "Sadie", "Eli", "Elena", "Aaron", "Athena", "Landon", "Naomi", "Carson", "Vivian", "Hunter", 
    "Madeline", "Charles", "Adeline", "Adrian", "Lyla", "Leo", "Lucia", "Cameron", "Delilah", "Theodore", 
    "Gianna", "Elias", "Isabelle", "Sebastian", "Valentina", "Henry", "Skyler", "Roman", "Eliana", "Jack", 
    "Josephine", "Maverick", "Cora", "Ryan", "Vera", "Jaxon", "Everly", "Miles", "Isabel", "Sawyer", "Isla", 
    "Max", "Ivy", "Harrison", "Emilia", "David", "Malia", "Grayson", "Rosalie", "Gabriel", "Zoe", "Dominic", 
    "Iris", "Muhammad", "Liliana", "Micah", "Quinn", "Josiah", "Aria", "Colin", "Lana", "Leonardo", "Eva", 
    "Silas", "Peyton", "Brooks", "Elise", "Jesse", "Luna", "Ezekiel", "Summer", "Smith", "Johnson", "Williams", 
    "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", 
    "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", 
    "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", 
    "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", 
    "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", 
    "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", 
    "Morgan", "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", 
    "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", 
    "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry", "Russell", 
    "Sullivan", "Bell", "Coleman", "Butler", "Henderson", "Barnes", "Gonzales", "Fisher", "Vasquez", "Simmons", "Romero", 
    "Jordan", "Patterson", "Alexander", "Hamilton", "Graham", "Reynolds", "Griffin", "Wallace", "Moreno", "West", "Cole", 
    "Hayes", "Bryant", "Herrera", "Gibson", "Ellis", "Tran", "Medina", "Aguilar", "Stevens", "Murray", "Ford", "Castro", 
    "Marshall", "Owens", "Harrison", "Fernandez", "Mcdonald", "Woods", "Washington", "Kennedy", "Wells", "Vargas", "Henry", 
    "Chen", "Freeman", "Webb", "Tucker", "Guzman", "Burns", "Crawford", "Powers", "Cunningham", "Lopez", "Diaz", "Cruz", 
    "Wood", "Mendoza", "Hernandez", "Diaz", "Parker", "Ward", "Ramos", "Foster", "Ortega", "Chavez", "Hunter", "Romero", 
    "Hicks", "Mitchell", "Banks", "Figueroa", "Mejia", "Crawford", "Fischer", "Ramos", "Solis", "Vasquez", "Hubbard", "Vega", 
    "Howell", "Tran", "Carroll", "Perez", "Adams", "Santos", "Horton", "Shelton", "Olson", "Velasquez", "Hammond", "Huff", 
    "Hardy", "Wheeler", "Petty", "Ellis", "Garza", "Francis", "Mcdaniel", "Brock", "Salazar", "Petersen", "Espinoza",
    "Aram", "Anahit", "Vardan", "Lilit", "Tigran", "Sona", "Hayk", "Lusine", "Gor", "Mariam", "Ashot", "Hasmik", "Artur", 
    "Naira", "Levon", "Liana", "Garik", "Satenik", "Karen", "Ani", "Gagik", "Gayane", "Ara", "Anush", "Arsen", "Silva", "Suren", 
    "Mane", "Mikayel", "Liana", "Armen", "Siranush", "Vahe", "Vika", "Vahagn", "Anahid", "Arman", "Maro", "Ruben", "Lusineh", 
    "Samvel", "Nare", "Gevorg", "Ani", "Haykaz", "Svetlana", "Sasun", "Arpine", "Sarkis", "Susanna", "Alik", "Margarit", "Vartan", 
    "Anna", "Arshak", "Maral", "Rafayel", "Alina", "Garnik", "Tatev", "Davit", "Alisa", "Hakob", "Lusine", "Vrezh", "Ruzanna", "Gor", 
    "Diana", "Rubik", "Hasmik", "Gurgen", "Tatevik", "Varuzhan", "Anahit", "Sasun", "Arus", "Armenak", "Mariam", "Mher", "Knarik", 
    "Vahakn", "Alina", "Serob", "Liana", "Ara", "Sona", "Hovhannes", "Svetlana", "Vahe", "Ani", "Narek", "Kristina", "Razmik", "Lilit", 
    "Vahe", "Satenik", "Harutyun", "Nune", "Hrayr", "Karine", "Nairi", "Viken", "Sofia", "Ararat", "Marina", "Nareh", "Viken", "Anahid", 
    "Edgar", "Lusin", "Levon", "Vardan", "Astghik", "Krikor", "Lusine", "Hakob", "Sirarpi", "Tigran", "Anoush", "Vahan", "Maral", "Nare", 
    "Vartan", "Naira", "Hrayr", "Ani", "Sevan", "Viken", "Lucine", "Edgar", "Lucy", "Razmik", "Nina", "Nerses", "Sose", "Manuel", "Marina", 
    "Nane", "Raffi", "Sona", "Tigran", "Rita", "Nareg", "Ruzan", "Artur", "Arpi", "Aram", "Lusin", "Hagop", "Shushan", "Gurgen", "Narine", 
    "Zaven", "Ella", "Raffi", "Lena", "Arman", "Lilit", "Hovsep", "Armine", "Nerses", "Ruzan", "Garo", "Anoush", "Garen", "Narine", "Gagik", 
    "Anush", "Hovsep", "Ani", "Hagop", "Lucy", "Tigran", "Ruzan", "Krikor", "Maral", "Narine", "Mane", "Artur", "Lusin", "Garo", "Ani", "Rita", 
    "Hagop", "Zara", "Hovsep", "Raffi", "Nare", "Marina", "Razmik", "Lena", "Garen", "Shushan", "Gurgen", "Sona", "Arpi", "Zaven", "Lucine", 
    "Krikor", "Ruzan", "Mane", "Narine", "Artur", "Anush", "Aram", "Rita", "Tigran", "Lilit", "Garo", "Ani", "Lusin", "Hagop", "Raffi", "Nare", 
    "Shushan", "Gurgen", "Lucy", "Ruzan", "Zara", "Krikor", "Arpi", "Rita", "Hovsep", "Narine", "Artur", "Lucine", "Raffi", "Garo", "Tigran", 
    "Lilit", "Hagop", "Ani", "Ruzan", "Shushan", "Gurgen", "Lusin", "Krikor", "Maral", "Zara", "Narine", "Artur", "Rita", "Garo", "Lucy", 
    "Raffi", "Shushan", "Ruzan", "Hagop", "Gurgen", "Tigran", "Ani", "Lilit", "Lucine", "Rita",
]


let id 
const root = document.querySelector("#root")
const input = document.querySelector("#input")
let SearchText = " "

input.addEventListener("keyup", (e) => {
const firstLetter = e.target.value.charAt(0).toUpperCase();
const restOfText = e.target.value.slice(1).toLowerCase();
SearchText = firstLetter + restOfText;
refresh()

function refresh(){
    if(id !== undefined) clearTimeout(id)
    id = setTimeout(()=>{
        render()
    },400)
}
})
function render() {
    if(SearchText === "") SearchText = " "
    root.innerHTML = ""
    list.filter((name)=>{
        return name.indexOf(SearchText) !== -1
    })
        .map(name => {
            const Div = document.createElement("div");
            Div.innerHTML = name;
            return Div
        }).forEach(element => {
            root.appendChild(element);
        });
}


