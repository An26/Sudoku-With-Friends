var React = require('react');
import Chat from '../Chat/Chat';

var PlayGame = React.createClass({
	render: function(){
		return(
			<div className = "main-content">
				<p>This is the place where users actually play sudoku either by themselves or with someone they know...
				</p>

				<div className="row">
					<div className="chat"> 
						<p>chatty chat chat</p>
						<Chat />

					</div>
					<div className="game-here">
						<table>
							<tbody>
							  <tr>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							  </tr>
							  <tr>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							  </tr>
							  <tr>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							  </tr>
							  <tr>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							  </tr>
							  <tr>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							  </tr>
							  <tr>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							  </tr>
							  <tr>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							  </tr>
							  <tr>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							  </tr>
							  <tr>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							    <td> x </td>
							  </tr>
						  </tbody>
						</table>
					</div>
				</div>
			</div>
			)
	}
});

module.exports = PlayGame;