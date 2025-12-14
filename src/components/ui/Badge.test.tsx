import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { Badge } from './Badge';

describe('Badge', () => {
  it('should render badge with text', () => {
    render(<Badge>Action</Badge>);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should apply default variant styles', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('bg-white/90');
  });

  it('should apply primary variant styles', () => {
    render(<Badge variant="primary">Primary</Badge>);
    expect(screen.getByText('Primary')).toHaveClass('bg-primary-100');
  });

  it('should apply accent variant styles', () => {
    render(<Badge variant="accent">Accent</Badge>);
    expect(screen.getByText('Accent')).toHaveClass('bg-accent-100');
  });

  it('should apply success variant styles', () => {
    render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-emerald-100');
  });

  it('should apply warning variant styles', () => {
    render(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText('Warning')).toHaveClass('bg-amber-100');
  });

  it('should accept custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });
});

