
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface Service {
  id: number;
  name: string;
  price: string;
  description: string;
}

const ServicesTab = () => {
  const { toast } = useToast();
  
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Plomberie", price: "50", description: "Réparation et installation de plomberie" },
    { id: 2, name: "Électricité", price: "60", description: "Travaux d'électricité et dépannage" },
  ]);
  
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: "",
  });
  
  const handleNewServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddService = () => {
    if (newService.name && newService.price) {
      setServices(prev => [
        ...prev, 
        { 
          id: prev.length + 1, 
          name: newService.name, 
          price: newService.price, 
          description: newService.description 
        }
      ]);
      
      setNewService({
        name: "",
        price: "",
        description: "",
      });
      
      toast({
        title: "Service ajouté",
        description: "Le nouveau service a été ajouté avec succès.",
      });
    }
  };
  
  const handleRemoveService = (id: number) => {
    setServices(prev => prev.filter(service => service.id !== id));
    
    toast({
      title: "Service supprimé",
      description: "Le service a été supprimé avec succès.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services proposés</CardTitle>
        <CardDescription>
          Gérez les services que vous proposez à vos clients, avec leurs tarifs et descriptions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Services actuels</h3>
          
          {services.length === 0 ? (
            <p className="text-muted-foreground">Vous n'avez pas encore ajouté de services.</p>
          ) : (
            <div className="space-y-4">
              {services.map(service => (
                <div key={service.id} className="p-4 border rounded-md flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <p className="mt-1 font-medium">{service.price} €/heure</p>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleRemoveService(service.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Ajouter un nouveau service</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-name">Nom du service</Label>
                <Input 
                  id="service-name" 
                  name="name"
                  value={newService.name} 
                  onChange={handleNewServiceChange} 
                  placeholder="ex: Plomberie"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-price">Prix horaire (€)</Label>
                <Input 
                  id="service-price" 
                  name="price"
                  value={newService.price} 
                  onChange={handleNewServiceChange} 
                  placeholder="ex: 50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-description">Description du service</Label>
              <Textarea 
                id="service-description" 
                name="description"
                value={newService.description} 
                onChange={handleNewServiceChange} 
                placeholder="Décrivez brièvement le service que vous proposez"
                rows={3}
              />
            </div>
            
            <Button onClick={handleAddService}>Ajouter ce service</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesTab;
