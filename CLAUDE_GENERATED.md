# Claude Generated Code

**Task**: Objective:
Help design and implement new features based on the current roadmap or project needs. Focus on clean, scalable, and testable code

Claude Tasks:

🧩 Feature Implementation
Read the existing codebase and integrate new feature modules where appropriate.

Ensure new code follows existing patterns and conventions.

🗂️ Example Features (replace/add specifics as needed):
Add user role-based access control

Implement export to PDF

Add multi-language support

Enable dark mode toggle

🧪 Testing & Documentation
Add unit/integration tests for new functionality.

Update README or in-code comments if required.

**Generated on**: Sat Jul 26 18:34:43 UTC 2025

## Generated Content

```
I notice there's a mismatch between the task description and the current codebase. The task asks for implementing features in an "Ionic React TypeScript application for government billing/invoicing," but the current codebase is actually a CLI tool for creating Filecoin applications.

I'll assume you want me to help transform this CLI tool to generate Ionic React applications with billing/invoicing capabilities, or add templates for such applications. Let me implement a feature to add government billing/invoicing templates to the CLI.

## FILES_TO_CREATE

### 1. `src/templates/ionic-billing/package.json`
### 2. `src/templates/ionic-billing/src/App.tsx`
### 3. `src/templates/ionic-billing/src/components/InvoiceList.tsx`
### 4. `src/templates/ionic-billing/src/components/InvoiceForm.tsx`
### 5. `src/templates/ionic-billing/src/types/invoice.ts`
### 6. `src/templates/ionic-billing/src/services/authService.ts`
### 7. `src/templates/ionic-billing/src/hooks/useAuth.ts`
### 8. `src/templates/ionic-billing/ionic.config.json`
### 9. `src/templates/ionic-billing/capacitor.config.ts`

## FILES_TO_MODIFY

### 1. `src/index.ts`
### 2. `package.json`

## CODE_CHANGES

### FILES_TO_CREATE

**src/templates/ionic-billing/package.json**
```json
{
  "name": "ionic-billing-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@capacitor/app": "^5.0.0",
    "@capacitor/core": "^5.0.0",
    "@capacitor/haptics": "^5.0.0",
    "@capacitor/keyboard": "^5.0.0",
    "@capacitor/status-bar": "^5.0.0",
    "@ionic/react": "^7.0.0",
    "@ionic/react-router": "^7.0.0",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.2.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.11.47",
    "@types/react": "^18.0.15",
    "@types/react-dom": "^18.0.6",
    "@types/react-router": "^5.1.18",
    "@types/react-router-dom": "^5.3.3",
    "ionicons": "^7.0.0",
    "jspdf": "^2.5.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.43.0",
    "react-router": "^5.3.3",
    "react-router-dom": "^5.3.3",
    "react-scripts": "5.0.1",
    "typescript": "^4.7.4",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@capacitor/cli": "^5.0.0"
  }
}
```

**src/templates/ionic-billing/src/types/invoice.ts**
```typescript
export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled'
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CLERK = 'clerk',
  VIEWER = 'viewer'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  isActive: boolean;
}
```

**src/templates/ionic-billing/src/services/authService.ts**
```typescript
import { User, UserRole } from '../types/invoice';

class AuthService {
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@gov.com' && password === 'admin123') {
          this.currentUser = {
            id: '1',
            email: 'admin@gov.com',
            name: 'Admin User',
            role: UserRole.ADMIN,
            department: 'Finance',
            isActive: true
          };
          resolve(this.currentUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  hasPermission(action: string): boolean {
    if (!this.currentUser) return false;

    const permissions = {
      [UserRole.ADMIN]: ['create', 'read', 'update', 'delete', 'export'],
      [UserRole.MANAGER]: ['create', 'read', 'update', 'export'],
      [UserRole.CLERK]: ['create', 'read', 'update'],
      [UserRole.VIEWER]: ['read']
    };

    return permissions[this.currentUser.role]?.includes(action) || false;
  }
}

export const authService = new AuthService();
```

**src/templates/ionic-billing/src/hooks/useAuth.ts**
```typescript
import { useState, useEffect } from 'react';
import { User } from '../types/invoice';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const hasPermission = (action: string) => {
    return authService.hasPermission(action);
  };

  return {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user
  };
};
```

**src/templates/ionic-billing/src/components/InvoiceList.tsx**
```typescript
import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonIcon,
  IonBadge,
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonAlert,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import { add, download, eye, trash, create } from 'ionicons/icons';
import { Invoice, InvoiceStatus } from '../types/invoice';
import { useAuth } from '../hooks/useAuth';
import jsPDF from 'jspdf';

interface InvoiceListProps {
  onCreateInvoice: () => void;
  onEditInvoice: (invoice: Invoice) => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ onCreateInvoice, onEditInvoice }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchText, setSearchText] = useState('');
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { hasPermission } = useAuth();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    // Simulate API call
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        invoiceNumber: 'INV-2024-001',
        clientName: 'ABC Corporation',
        clientEmail: 'contact@abc.com',
        clientAddress: '123 Main St, City, State 12345',
        issueDate: '2024-01-15',
        dueDate: '2024-02-15',
        items: [
          {
            id: '1',
            description: 'Consulting Services',
            quantity: 10,
            rate: 150,
            amount: 1500
          }
        ],
        subtotal: 1500,
        tax: 150,
        total: 1650,
        status: InvoiceStatus.SENT,
        createdBy: 'admin@gov.com',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      }
    ];
    setInvoices(mockInvoices);
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.clientName.toLowerCase().includes(searchText.toLowerCase()) ||
    invoice.invoiceNumber.toLowerCase().includes(searchText.toLowerCase())
  );

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.DRAFT: return 'medium';
      case InvoiceStatus.SENT: return 'primary';
      case InvoiceStatus.PAID: return 'success';
      case InvoiceStatus.OVERDUE: return 'danger';
      case InvoiceStatus.CANCELLED: return 'dark';
      default: return 'medium';
    }
  };

  const handleDelete = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (selectedInvoice) {
      // Simulate API call
      setInvoices(invoices.filter(inv => inv.id !== selectedInvoice.id));
      setToastMessage('Invoice deleted successfully');
      setShowToast(true);
    }
    setShowDeleteAlert(false);
    setSelectedInvoice(null);
  };

  const exportToPDF = (invoice: Invoice) => {
    if (!hasPermission('export')) {
      setToastMessage('You do not have permission to export');
      setShowToast(true);
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('INVOICE', 20, 20);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 20, 40);
    doc.text(`Client: ${invoice.clientName}`, 20, 50);
    doc.text(`Date: ${invoice.issueDate}`, 20, 60);
    doc.text(`Due Date: ${invoice.dueDate}`, 20, 70);
    doc.text(`Total: $${invoice.total.toFixed(2)}`, 20, 80);
    doc.save(`${invoice.invoiceNumber}.pdf`);
  };

  const doRefresh = (event: CustomEvent) => {
    loadInvoices().then(() => {
      event.detail.complete();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Invoices</IonTitle>
          <IonButtons slot="end">
            {hasPermission('create') && (
              <IonButton onClick={onCreateInvoice}>
                <IonIcon icon={add} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          placeholder="Search invoices..."
        />

        <IonGrid>
          <IonRow>
            {filteredInvoices.map((invoice) => (
              <IonCol size="12" sizeMd="6" sizeLg="4" key={invoice.id}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{invoice.invoiceNumber}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p><strong>Client:</strong> {invoice.clientName}</p>
                    <p><strong>Amount:</strong> ${invoice.total.toFixed(2)}</p>
                    <p><strong>Due:</strong> {invoice.dueDate}</p>
                    <IonBadge color={getStatusColor(invoice.status)}>
                      {invoice.status.toUpperCase()}
                    </IonBadge>
                    
                    <div style={{ marginTop: '10px' }}>
                      {hasPermission('read') && (
                        <IonButton size="small" fill="outline">
                          <IonIcon icon={eye} />
                        </IonButton>
                      )}
                      {hasPermission('update') && (
                        <IonButton 
                          size="small" 
                          fill="outline" 
                          onClick={() => onEditInvoice(invoice)}
                        >
                          <IonIcon icon={create} />
                        </IonButton>
                      )}
                      {hasPermission('export') && (
                        <IonButton 
                          size="small" 
                          fill="outline" 
                          onClick={() => exportToPDF(invoice)}
                        >
                          <IonIcon icon={download} />
                        </IonButton>
                      )}
                      {hasPermission('delete') && (
                        <IonButton 
                          size="small" 
                          fill="outline" 
                          color="danger"
                          onClick={() => handleDelete(invoice)}
                        >
                          <IonIcon icon={trash} />
                        </IonButton>
                      )}
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {hasPermission('create') && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={onCreateInvoice}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Confirm Delete"
          message="Are you sure you want to delete this invoice?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Delete',
              handler: confirmDelete
            }
          ]}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default InvoiceList;
```

**src/templates/ionic-billing/src/components/InvoiceForm.tsx**
```typescript
import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonButtons,
  IonIcon,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonToast,
  IonLoading
} from '@ionic/react';
import { save, close, add, trash } from 'ionicons/icons';
import { useForm, useFieldArray } from 'react-hook-form';
import { Invoice, InvoiceItem, InvoiceStatus } from '../types/invoice';

interface InvoiceFormProps {
  invoice?: Invoice;
  onSave: (invoice: Invoice) => void;
  onCancel: () => void;
}

interface FormData {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  status: InvoiceStatus;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, onSave, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      invoiceNumber: invoice?.invoiceNumber || '',
      clientName: invoice?.clientName || '',
      clientEmail: invoice?.clientEmail || '',
      clientAddress: invoice?.clientAddress || '',
      issueDate: invoice?.issueDate || new Date().toISOString().split('T')[0],
      dueDate: invoice?.dueDate || '',
      items: invoice?.items || [{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }],
      status: invoice?.status || InvoiceStatus.DRAFT
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const watchedItems = watch('items');

  useEffect(() => {
    // Calculate amounts for each item
    watchedItems.forEach((item, index) => {
      const amount = item.quantity * item.rate;
      setValue(`items.${index}.amount`, amount);
    });
  }, [watchedItems, setValue]);

  const calculateSubtotal = () => {
    return watchedItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const invoiceData: Invoice = {
        id: invoice?.id || Date.now().toString(),
        invoiceNumber: data.invoiceNumber,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientAddress: data.clientAddress,
        issueDate: data.issueDate,
        dueDate: data.dueDate,
        items: data.items,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
        status: data.status,
        createdBy: 'admin@gov.com', // Should come from auth
        createdAt: invoice?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(invoiceData);
      setToastMessage('Invoice saved successfully');
      setShowToast(true);
    } catch (error) {
      setToastMessage('Error saving invoice');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = () => {
    append({
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    });
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{invoice ? 'Edit Invoice' : 'Create Invoice'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Invoice Details</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Invoice Number</IonLabel>
                      <IonInput 
                        {...control.register('invoiceNumber', { required: true })}
                        required
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Status</IonLabel>
                      <IonSelect 
                        {...control.register('status')}
                        interface="popover"
                      >
                        <IonSelectOption value={InvoiceStatus.DRAFT}>Draft</IonSelectOption>
                        <IonSelectOption value={InvoiceStatus.SENT}>Sent</IonSelectOption>
                        <IonSelectOption value={InvoiceStatus.PAID}>Paid</IonSelectOption>
                        <IonSelectOption value={InvoiceStatus.OVERDUE}>Overdue</IonSelectOption>
                        <IonSelectOption value={InvoiceStatus.CANCELLED}>Cancelled</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonCol>
                </IonRow>
                
                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Issue Date</IonLabel>
                      <IonDatetime 
                        {...control.register('issueDate', { required: true })}
                        presentation="date"
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Due Date</IonLabel>
                      <IonDatetime 
                        {...control.register('dueDate', { required: true })}
                        presentation="date"
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Client Information</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position="stacked">Client Name</IonLabel>
                <IonInput 
                  {...control.register('clientName', { required: true })}
                  required
                />
              </IonItem>
              
              <IonItem>
                <IonLabel position="stacked">Client Email</IonLabel>
                <IonInput 
                  {...control.register('clientEmail', { required: true })}
                  type="email"
                  required
                />
              </IonItem>
              
              <IonItem>
                <IonLabel position="stacked">Client Address</IonLabel>
                <IonTextarea 
                  {...control.register('clientAddress')}
                  rows={3}
                />
              </IonItem>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                Items
                <IonButton 
                  fill="outline" 
                  size="small" 
                  onClick={addItem}
                  style={{ float: 'right' }}
                >
                  <IonIcon icon={add} />
                </IonButton>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {fields.map((field, index) => (
                <IonCard key={field.id}>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12">
                          <IonItem>
                            <IonLabel position="stacked">Description</IonLabel>
                            <IonInput 
                              {...control.register(`items.${index}.description`, { required: true })}
                              required
                            />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="4">
                          <IonItem>
                            <IonLabel position="stacked">Quantity</IonLabel>
                            <IonInput 
                              {...control.register(`items.${index}.quantity`, { required: true, min: 1 })}
                              type="number"
                              min="1"
                              required
                            />
                          </IonItem>
                        </IonCol>
                        <IonCol size="4">
                          <IonItem>
                            <IonLabel position="stacked">Rate</IonLabel>
                            <IonInput 
                              {...control.register(`items.${index}.rate`, { required: true, min: 0 })}
                              type="number"
                              min="0"
                              step="0.01"
                              required
                            />
                          </IonItem>
                        </IonCol>
                        <IonCol size="4">
                          <IonItem>
                            <IonLabel position="stacked">Amount</IonLabel>
                            <IonInput 
                              value={watchedItems[index]?.amount?.toFixed(2) || '0.00'}
                              readonly
                            />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="12">
                          <IonButton 
                            fill="outline" 
                            color="danger" 
                            onClick={() => removeItem(index)}
                            disabled={fields.length === 1}
                          >
                            <IonIcon icon={trash} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Summary</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <strong>Subtotal:</strong>
                  </IonCol>
                  <IonCol size="6" className="ion-text-right">
                    ${calculateSubtotal().toFixed(2)}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <strong>Tax (10%):</strong>
                  </IonCol>
                  <IonCol size="6" className="ion-text-right">
                    ${calculateTax().toFixed(2)}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <strong>Total:</strong>
                  </IonCol>
                  <IonCol size="6" className="ion-text-right">
                    <strong>${calculateTotal().toFixed(2)}</strong>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonButton 
                  expand="block" 
                  fill="outline" 
                  onClick={onCancel}
                >
                  Cancel
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton 
                  expand="block" 
                  type="submit"
                  disabled={isLo
```
