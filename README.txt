Din uppgift är att hantera elever som söker till eftergymnasiala utbildningar och matcha dem med rätt skolor. Ta fram en applikation som underlättar arbetet.

Data för elever: https://api.mocki.io/v2/01047e91/students

Data för skolor: https://api.mocki.io/v2/01047e91/schools

 

Kriterier för Godkänt


Användaren ska ha möjlighet att se samtliga elever i en lista när sidan laddas.
Användaren ska kunna filtrera eleverna i listan baserat på utbildning.
Användaren ska också kunna sortera listan baserat på följande:
Ålder (lägst först)
Förnamn (alfabetisk ordning)
Efternamn (alfabetisk ordning)
Användaren ska kunna välja en elev i listan, och se en lista över samtliga skolor som passar eleven. (En skola passar en elev om dess önskade utbildning finns samt att skolan har en aktivitet som matchar en av elevens hobbys).
 

Kriterier för VG

 

All sortering på listan över elever ska kunna göras i stigande och fallande ordning.
Användaren ska kunna söka efter elever via en fritext. Användare kan välja att söka på förnamn, efternamn, utbildning eller elever som har en specifik hobby. (OBS! Söker användare på för- eller efternamn måste hen skriva HELA namnet för att få en matchning. Man kan dock blanda versaler och gemener och få en matching t.ex.
        “mArIA” => Alla som heter Maria visas

         “Mari" => Endast elever som heter Mari matchas, ej Maria.

När användare väljer en elev i listan, ska samtliga skolor visas. De ska vara färgsorterade efter hur väl de matchar elevens behov (dvs gröna skolor ska vara högst upp, sedan gula, sedan röda):
Grön: Utbildning samt aktiviteter för alla elevens hobbys finns.
Gul: Utbildning finns, men alla aktiviteter finns inte.
Röd: Utbildning finns inte.