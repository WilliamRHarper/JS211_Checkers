Start by making the pieces
if the color is white make it a white symbol
otherwise the symbol color is black
then make a checkers attribute and set it to an empty array
create a create checkers method in the board class and push the created checkers into the checkers array
in the game class split the inputs into arrays and change them from string to numbers
if the piece is black and the move is diagonal and the spot we're moving to is empty
remove the piece from the starting spot and add it to the end location
if the piece is white and the move is diagonal and the spot we're moving to is empty
remove the piece from the starting spot and add it to the end location
**for jumps**
if legal diagonal jump and the piece in the diagonal space next to the starting location is the opposite color
remove the piece from the starting loacation, remove the jumped piece and put the jumping piece in the end location
**for kings**
if black piece gets to the top most squares
change black piece to black piece king symbol
if white piece gets to bottommost squares
change white piece to white pice king symbol
**for king jumps**
if legal diagonal move and place we're jumping to is empty && the piece we're jumping is the opposite color
remove the piece from the starting loacation, remove the jumped piece and put the jumping piece in the end location
**for king double jumps**
if legal diagonal double move and place we;re jumping to is empty and the pieces we're jumping are the opposite color
remove the piece from the starting loacation, remove the jumped pieces and put the jumping piece in the end location
