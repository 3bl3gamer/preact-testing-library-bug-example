const { h, Component } = require('preact')
const { useState, useEffect } = require('preact/hooks')
const { render, waitFor } = require('@testing-library/preact')

function Comp({}) {
	const [val, setVal] = useState('original value')
	useEffect(() => {
		setTimeout(() => setVal('new value'), 300) // <- 300ms delay
	}, [])
	return <div>{val}</div>
}
/*
class Comp extends Component {
	constructor() {
		super()
		this.state = { val: 'original value' }
	}
	componentDidMount() {
		console.log('mounted')
		setTimeout(() => this.setState({ val: 'new value' }), 300)
	}
	render() {
		return <div>{this.state.val}</div>
	}
}
*/

it('fails', async () => {
	const { container, rerender } = render(<Comp />)
	rerender(<Comp />) // <- cause
	// await new Promise(r => setTimeout(r, 350)) // <- fix
	await waitFor(() => {
		expect(container.textContent).toEqual('new value')
	})
})

/*
it('has rerender', () => {
	const { rerender } = render(<div />)
	rerender(<div />) // <- cause
})

function Comp({}) {
	const [val, setVal] = useState('original value')
	setTimeout(() => setVal('new value'), 300) // <- 300ms delay
	return <div>{val}</div>
}
it('has waitFor (and fails)', async () => {
	const { container } = render(<Comp />)
	// await new Promise(r => setTimeout(r, 350)) // <- fix
	await waitFor(() => {
		expect(container.textContent).toEqual('new value')
	})
})
*/
