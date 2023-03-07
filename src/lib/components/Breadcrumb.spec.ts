import { render, screen } from '@testing-library/svelte';
import Breadcrumb from './Breadcrumb.svelte';

describe('Breadcrumb.svelte', async () => {
	it('should split path', async () => {
		render(Breadcrumb, { path: '/foo/bar' });
		expect(screen.queryByText('/foo/bar')).not.toBeInTheDocument();
		expect(screen.queryByText('foo')).toBeInTheDocument();
		expect(screen.queryByText('bar')).toBeInTheDocument();
	});

	it('should give each crumb a link except the last', async () => {
		render(Breadcrumb, { path: '/x/y/z' });

		const xCrumb = screen.getByTestId('x-crumb');
		const xLink = screen.getByTestId('x-link');
		expect(xCrumb).toContainElement(xLink);

		const yCrumb = screen.getByTestId('y-crumb');
		const yLink = screen.getByTestId('y-link');
		expect(yCrumb).toContainElement(yLink);

		expect(screen.queryByTestId('z-link')).toBeNull();
	});
});
